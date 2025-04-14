import { Request, Response } from 'express';
import { Op } from 'sequelize';

import AppealModel from '../models/appeal';
import { AppealStatus } from '../types/appeal';

export const createAppeal = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { subject, text } = req.body

		if (!subject || !text) {
			res.status(400).json({ error: 'Subject and text are required' })
			return
		}

		const appeal = await AppealModel.create({
			subject,
			text,
			status: AppealStatus.NEW,
		})

		res.status(201).json(appeal)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

export const startProcessing = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params
		const appeal = await AppealModel.findByPk(id)

		if (!appeal) {
			res.status(404).json({ error: 'Appeal not found' })
			return
		}

		if (appeal.status !== AppealStatus.NEW) {
			res.status(400).json({ error: 'Appeal is not in NEW status' })
			return
		}

		appeal.status = AppealStatus.IN_PROGRESS

		await appeal.save()

		res.json(appeal)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

export const completeAppeal = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params
		const { resolution } = req.body

		if (!resolution) {
			res.status(400).json({ error: 'Resolution text is required' })
			return
		}

		const appeal = await AppealModel.findByPk(id)

		if (!appeal) {
			res.status(404).json({ error: 'Appeal not found' })
			return
		}

		if (appeal.status !== AppealStatus.IN_PROGRESS) {
			res.status(400).json({ error: 'Appeal is not IN PROGRESS' })
			return
		}

		appeal.status = AppealStatus.COMPLETED
		appeal.resolution = resolution

		await appeal.save()

		res.json(appeal)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

export const cancelAppeal = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params
		const { cancelReason } = req.body

		if (!cancelReason) {
			res.status(400).json({ error: 'Cancel reason is required' })
			return
		}

		const appeal = await AppealModel.findByPk(id)

		if (!appeal) {
			res.status(404).json({ error: 'Appeal not found' })
			return
		}

		if (appeal.status === AppealStatus.COMPLETED) {
			res.status(404).json({ error: 'Cant be canceled completed appeal' })
			return
		}

		appeal.status = AppealStatus.CANCELLED
		appeal.cancelReason = cancelReason

		await appeal.save()

		res.json(appeal)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

export const getAppeals = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { date, startDate, endDate } = req.query
		const where: any = {}

		if (date) {
			const inputDate = String(date)
			const parsedDate = new Date(inputDate)

			if (isNaN(parsedDate.getTime())) {
				res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' })
				return
			}

			const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0))
			const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999))

			where.createdAt = {
				[Op.between]: [startOfDay, endOfDay],
			}
		}

		if (startDate && endDate && !date) {
			const parsedStartDate = new Date(String(startDate))
			const parsedEndDate = new Date(String(endDate))

			if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
				res.status(400).json({
					error: 'Invalid startDate or endDate format. Use YYYY-MM-DD',
				})
				return
			}

			const start = new Date(parsedStartDate.setHours(0, 0, 0, 0))
			const end = new Date(parsedEndDate.setHours(23, 59, 59, 999))

			where.createdAt = {
				[Op.between]: [start, end],
			}
		} else if (startDate || endDate) {
			res.status(400).json({
				error: 'Both startDate and endDate are required for range filtering',
			})
			return
		}

		const appeals = await AppealModel.findAll({ where })

		res.json(appeals)
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

export const cancelAllInProgress = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { cancelReason } = req.body
		if (!cancelReason) {
			res.status(400).json({ error: 'Cancel reason is required' })
			return
		}

		const updatedCount = await AppealModel.update(
			{
				status: AppealStatus.CANCELLED,
				cancelReason,
			},
			{
				where: { status: AppealStatus.IN_PROGRESS },
			}
		)

		res.json({ message: `Cancelled ${updatedCount[0]} appeals` })
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

export enum AppealStatus {
	NEW = 'new',
	IN_PROGRESS = 'in_progress',
	COMPLETED = 'completed',
	CANCELLED = 'cancelled',
}

export interface Appeal {
	id: number
	subject: string
	text: string
	status: AppealStatus
	resolution?: string
	cancelReason?: string
	createdAt: Date
	updatedAt: Date
}

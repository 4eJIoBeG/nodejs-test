import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../config/db';
import { AppealStatus } from '../types/appeal';

class AppealModel extends Model {
	public id!: number
	public subject!: string
	public text!: string
	public status!: AppealStatus
	public resolution?: string
	public cancelReason?: string
	public createdAt!: Date
	public updatedAt!: Date
}

AppealModel.init(
	{
		subject: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM(...Object.values(AppealStatus)),
			defaultValue: AppealStatus.NEW,
		},
		resolution: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		cancelReason: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: 'Appeal',
		tableName: 'appeals',
		timestamps: true,
	}
)

export default AppealModel

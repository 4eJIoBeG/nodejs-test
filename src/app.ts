import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import * as swaggerDocument from '../swagger.json';
import { sequelize } from './config/db';
import appealRoutes from './routes/appealRoutes';

dotenv.config()
const app = express()

app.use(express.json())
app.use('/api/appeals', appealRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 3000

async function start() {
	try {
		await sequelize.authenticate()
		console.log('Connection to database successful')

		await sequelize.sync()
		console.log('Database synchronized')

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	} catch (error) {
		console.error('Unable to start server:', error)
	}
}

start()

import express from 'express'
import morgan from 'morgan'
import orderRouter from './routes/orderRoutes'


const app = express()
app.use(morgan('dev'))
app.use(express.json())


app.use('/api/order', orderRouter)

export default app
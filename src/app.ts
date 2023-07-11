import express from 'express'
import morgan from 'morgan'
import orderRouter from './routes/orderRoutes'
import routeRoutes from './routes/orderRoutes'


const app = express()
app.use(morgan('dev'))
app.use(express.json())


app.use('/api/order', orderRouter)
app.use('/api/route', routeRoutes)

export default app
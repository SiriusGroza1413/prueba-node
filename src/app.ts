import express from 'express'
import morgan from 'morgan'
import orderRouter from './routes/orderRoutes'
import routeRoutes from './routes/routeRoutes'


const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use('/route', routeRoutes)
app.use('/order', orderRouter)


export default app
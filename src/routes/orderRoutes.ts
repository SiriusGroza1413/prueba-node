import { Router } from 'express'
import * as orderControllers from '../controllers/orderControllers'

const router: Router = Router()

//OBTENER TODAS LAS ORDENES DE LA DB
router.get('/', orderControllers.getAllOrders)

export default router
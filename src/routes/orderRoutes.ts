import { Router } from 'express'
import * as orderControllers from '../controllers/orderControllers'

const router: Router = Router()



//CREAR UNA ORDEN
router.post('/', orderControllers.createOrder)

//OBTENER TODAS LAS ORDENES DE LA DB
router.get('/', orderControllers.getAllOrders)

//MODIFICAR UNA ORDEN EN CURSO
router.put('/:id', orderControllers.changeOrder)

export default router
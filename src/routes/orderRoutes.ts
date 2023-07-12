import { Router } from 'express'
import * as orderControllers from '../controllers/orderControllers'

const router: Router = Router()




//MODIFICAR UNA ORDEN
router.put('/:id', orderControllers.updateOrder)

//BORRAR UNA ORDEN
router.delete('/:id', orderControllers.deleteOrder)

//CREAR UNA ORDEN
router.post('/', orderControllers.createOrder)

//OBTENER TODAS LAS ORDENES DE LA DB
router.get('/', orderControllers.getAllOrders)



export default router
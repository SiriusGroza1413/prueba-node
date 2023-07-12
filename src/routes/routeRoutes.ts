import { Router } from 'express'
import * as routerController from '../controllers/routeController' 


const router: Router = Router()


router.get('/', routerController.getAllRoutes)
router.delete('/:id', routerController.deleteRoute)

export default router
import { Router } from 'express'

const router: Router = Router()


router.use('/', (req, res) => {
    res.status(200).json('works')
})

export default router
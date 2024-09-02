import { Router } from 'express'
import { login, me } from '../controllers/auth.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/login', login)
router.get('/me', validateToken, me)

export default router
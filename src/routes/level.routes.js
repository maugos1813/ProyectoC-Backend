import { Router } from 'express'
import LevelController from '../controllers/level.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/exams/:id', LevelController.getExamsByLevel)
router.get('/users/:id', LevelController.getUsersByLevel)
router.get('/all/',LevelController.getAll)


export default router
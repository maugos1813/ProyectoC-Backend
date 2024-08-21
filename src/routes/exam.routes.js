import { Router } from 'express'
import ExamController from '../controllers/exam.controller.js'
import { validateToken } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/:id', ExamController.getExam)
router.post('/', ExamController.createWithQuestions)
router.patch('/:id', ExamController.updateWithQuestions)

export default router
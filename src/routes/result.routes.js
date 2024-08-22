import { Router } from "express"
import ResultController from '../controllers/result.controller.js'
import Exam from "../models/Exam.js"

const router = Router()
router.post('/',ResultController.createResult)
router.get('/all/',ResultController.getAll)
router.get('/students/:id',ResultController.getResultsbyStudent)

export default router
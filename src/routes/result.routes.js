import { Router } from "express"
import ResultController from '../controllers/result.controller.js'
import Exam from "../models/Exam.js"
import {uploadVideo} from '../config/multer.js'

const router = Router()
router.post('/',uploadVideo.single('video'),ResultController.createResult)
router.get('/all/',ResultController.getAll)
router.get('/students/:id',ResultController.getResultsbyStudent)
router.get('/videos/', ResultController.getAllVideoQuestions)

export default router
import VideoController from '../controllers/video.controller.js'
import { uploadVideo } from './multer.js'
import { Router } from 'express'

const router = Router()

router.get('/', VideoController.getAllVideos)
router.get('/', VideoController.getVideoById)
router.post('/', VideoController.createVideo)
router.delete('/', VideoController.deleteVideo)
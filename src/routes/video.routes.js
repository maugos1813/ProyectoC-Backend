import VideoController from '../controllers/video.controller.js'
import { uploadVideo } from './multer.js'
import { Router } from 'express'

const router = Router()

router.get('/', uploadVideo.single('video'),VideoController.getAllVideos)
router.get('/:id', uploadVideo.single('video'),VideoController.getVideoById)
router.post('/', uploadVideo.single('video'),VideoController.createVideo)
router.delete('/', uploadVideo.single('video'),VideoController.deleteVideo)

export default router
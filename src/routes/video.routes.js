import VideoController from '../controllers/video.controller.js'
import { uploadVideo } from '../config/multer.js'
import { Router } from 'express'

const router = Router()

router.get('/', VideoController.getAllVideos)
router.get('/:id', VideoController.getVideoById)
router.post('/', uploadVideo.single('video'), VideoController.createVideo)
router.delete('/:id', VideoController.deleteVideo)

export default router
import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import { uploadImage } from '../config/multer.js'
import { handleError } from '../middlewares/middleware.js'


const router = Router()

router.get('/', UserController.index)
router.get('/:id', UserController.find)
router.post('/', uploadImage.single('image'), handleError, UserController.store)
router.post('/multiple/',UserController.storeMultiple)

export default router

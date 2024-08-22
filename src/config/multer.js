import multer from 'multer'
import User from '../models/User.js'


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const newName = Date.now() + '-' + file.originalname
    cb(null, newName)
  }
})

const imageFilter = async function (req, file, cb) {
  const { mimetype } = file
  const { username, email } = req.body

  const usuarioUsername = await User.where('username', username)
  const usuarioEmail = await User.where('email', email)

  if (usuarioUsername.length > 0 || usuarioEmail.length > 0) {
    return cb(new Error('Usuario o correo existentes'))
  }

  if (mimetype.includes('image')) {
    cb(null, true)
  } else {
    cb(new Error('Solo se aceptan imágenes'))
  }
}

const videoFilter = function (req, file, cb) {
  const { mimetype } = file;

  if (
    mimetype === 'video/mp4' ||
    mimetype === 'video/avi' ||
    mimetype === 'video/mkv' ||
    mimetype === 'video/mov' ||
    mimetype === 'video/wmv'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed.'));
  }
};

export const uploadImage = multer({ storage, fileFilter: imageFilter})
export const uploadVideo = multer({ storage, fileFilter: videoFilter })
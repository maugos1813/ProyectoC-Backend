import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const decoded = jwt.verify(authorization, SECRET_KEY)
    const usuario = await User.getById(decoded.usuarioId)

    if (usuario.length === 0) return res.status(404).json({ message: 'El token no pertenece a ningún usuario registrado' })

    req.user = usuario[0]

    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ message: 'Token expirado' })
    }

    res.status(500).json({ message: error.message })
  }
}
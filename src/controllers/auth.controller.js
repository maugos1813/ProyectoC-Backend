import { SECRET_KEY } from '../config/config.js'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body
    const usuario = await User.findOne({email})

    if (usuario.length === 0) return res.status(404).json({ message: 'El usuario no existe' })
      console.log(usuario)
    const esValido = await bcrypt.compare(password, usuario.password)
    console.log(esValido)
    if (!esValido) return res.status(400).json({ message: 'Credenciales inválidas' })

    const token = jwt.sign({ usuarioId: usuario.user_id }, SECRET_KEY, { expiresIn: '1h' })

    delete usuario.password
    res.json({ message: 'Login exitoso', token, user: usuario._id})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const me = async (req, res) => {
  delete req.user.password
  res.json(req.user)
}

import User from '../models/User.js'
import bcrypt from 'bcrypt'

class UserController {
  static async index(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(id)
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async store(req, res) {
    const { firstName, lastName, email, password, type, creationDate, lastConnection, level_id } = req.body

    if (!firstName || !lastName || !email || !password || !type) {
      return res.status(400).json({ message: 'Faltan datos' })
    }

    
    const passwordHashed = await bcrypt.hash(password, 10)



    try {
      const nuevoUsuario = await User.create({
        firstName,
        lastName,
        email,
        password: passwordHashed,
        type,
        creationDate: creationDate || Date.now(),
        lastConnection: lastConnection || null,
        level_id
      })

      res.status(201).json({ message: 'Usuario creado', data: nuevoUsuario })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async updatePut(req, res) {
    const { id } = req.params
    const { firstName, lastName, email, password, type, creationDate, lastConnection, level_id } = req.body

    if (!firstName || !lastName || !email || !password || !type) {
      return res.status(400).json({ message: 'Faltan datos' })
    }

    try {
      const user = await User.findById(id)

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      user.password = password
      user.type = type
      user.creationDate = creationDate || user.creationDate
      user.lastConnection = lastConnection || user.lastConnection
      user.level_id = level_id || user.level_id

      await user.save()

      res.status(200).json({ message: 'Usuario actualizado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async updatePatch(req, res) {
    const { id } = req.params
    const updates = req.body

    try {
      const user = await User.findById(id)

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      Object.assign(user, updates)
      await user.save()

      res.status(200).json({ message: 'Usuario parcialmente actualizado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete(req, res) {
    const { id } = req.params

    try {
      const user = await User.findById(id)

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      await User.findByIdAndDelete(id)
      res.status(200).json({ message: 'Usuario eliminado' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default UserController
import { Types } from 'mongoose'

export const validateCORS = (req, res, next) => {
    const validOrigins = ['http://localhost:5173']
    const { origin } = req.headers
  
    if (validOrigins.includes(origin) || !origin) {
      res.setHeader('Access-Control-Allow-Origin', origin ?? '*')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
      return next()
    }
  
    res.status(403).json({ message: 'Error de CORS. No estás permitido.' })
  }
  
  export const handleError = (err, req, res, next) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
  }

export const validateId = (req, res, next) => {
  const { id } = req.params
  
  if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' })
  }
  
  next()
}
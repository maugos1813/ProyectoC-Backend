import express from 'express'
import { validateCORS } from './middlewares/middleware.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import examRoutes from './routes/exam.routes.js'
import levelRoutes from './routes/level.routes.js'
import { PORT } from './config/config.js'
import { connectDB } from './config/db.js'

import morgan from 'morgan'

const app = express()

app.use(express.json())

app.use(morgan('dev'))
app.use(validateCORS)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/exams',examRoutes)
app.use('/api/levels',levelRoutes)

connectDB()
  .then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
  .catch(error => console.log(error))
import express from 'express'
import { validateCORS } from './middlewares/middleware.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import { PORT } from './config/config.js'

const app = express()

app.use(express.json())

app.use('/api/')
app.use(morgan('dev'))
app.use(validateCORS)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`))
import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_URL = process.env.DB_URL
export const SECRET_KEY = process.env.SECRET_KEY

console.log('PORT:', PORT);
console.log('DB_URL:', DB_URL);
console.log('SECRET_KEY:', SECRET_KEY);


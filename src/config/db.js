import { connect } from 'mongoose'
import { DB_URL } from './config.js'


export const connectDB = async () => {
  try {
    await connect(DB_URL, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000 // Aumenta el tiempo de espera
    });
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.log('Error en la conexión', error);
  }
}

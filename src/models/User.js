import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    firstName: {
    type: String,
    required: true
  },
    lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const User = model('Usuario', userSchema)

export default User
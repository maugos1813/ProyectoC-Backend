import { Schema, model } from 'mongoose'


const levelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sub_name: {
    type: String,
    required: true,
  }
}, {
  timestamps: true 
})


const Level = model('Level', levelSchema)

export default Level
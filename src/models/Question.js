import { Schema, model } from 'mongoose'

const questionSchema = new Schema({
  type: {
    type: String,
    enum: ['open', 'multiple-choice', 'video'],
    required: true
  },
  statement:{
    type: String,
    required: true
  },
  score:{
    type: String,
    required: true
  },
  correctAnswer: {
    type: Schema.Types.Mixed,  
    required: false
  },
  options: [String],
  exam_id: {
    type: Schema.Types.ObjectId,
    ref: 'Exam',
    required: false
  }
});

const Question = model('Question', questionSchema)

export default Question
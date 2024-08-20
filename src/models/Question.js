import { Schema, model } from 'mongoose'

const questionSchema = new Schema({
    type: {
    type: String,
    enum: ['open', 'multiple-choice', 'video'],
    required: true
  },
  correctAnswer: {
    type: Schema.Types.Mixed,  
    required: true
  },
  options: [{
    option_id: {
      type: String
    },
    text: {
      type: String
    }
  }],
  exam_id: {
    type: Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  }
});

const Question = model('Question', questionSchema)

export default Question
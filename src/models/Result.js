import { Schema, model } from "mongoose"

const resultSchema = new Schema({
    student_id:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    exam_id:{
        type: Schema.Types.ObjectId,
        ref:'Exam',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: { 
        type: Date,
        default: Date.now
    },
    finished: {
        type: Boolean,
        default: false,
        required: false
    },
    answers: [
        {
            question_id:{
                type: Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            answer: {
                type: Schema.Types.Mixed,
                required:true
            }
        }
    ],
})
const Result = model('Result',resultSchema)
export default Result
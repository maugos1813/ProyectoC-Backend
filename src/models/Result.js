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
        default: 0,
        required: false
    },
    date: { 
        type: Date,
        default: Date.now
    },
    status: { 
        type: String, 
        enum: ["blank", "completed", "reviewed"], 
        default: "blank",
        required: false 
    },
    answers: [
        {
            question_id: {
                type: Schema.Types.ObjectId,
                ref: 'Question',
                required: true
            },
            question_type: {
                type: String,
                enum: ["open", "multiple-choice", "video"],
                required: true
            },
            answer: {
                type: Schema.Types.Mixed,
                required: function() { return this.question_type !== 'video' }
            },
            isCorrect: {
                type: Boolean,
                required: false
            }
        }
    ],
})
const Result = model('Result',resultSchema)
export default Result
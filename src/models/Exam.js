import { Schema, SchemaType, model } from "mongoose"

const examSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level_id:{
        type: Schema.Types.ObjectId,
        ref: 'Level'
    },
    created_Date:{
        type: Date,
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
})

const Exam = model('Exam',examSchema)
export default Exam
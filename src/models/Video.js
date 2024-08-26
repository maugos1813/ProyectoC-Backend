import { Schema, model} from  'mongoose'

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    exam_id: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: false
    },
    videoPath: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
)

const video = model('Video', videoSchema)

export default video

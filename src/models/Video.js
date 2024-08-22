import { Schema, model} from  'mongoose'

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
)

const video = model('video', videoSchema)

export default video

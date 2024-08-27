import { Schema,Types, model } from 'mongoose';

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
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  lastConnection: {
    type: Date,
    default: null
  },
  photo: {
    type: String,
    required:false,
  }
  ,
  level_id: {
    type: Schema.Types.ObjectId,
    ref: 'Level',
    required: true
  }
});

const User = model('User', userSchema);

export default User;
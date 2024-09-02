import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: {
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
  topicIDs:[
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ]
})

const User = mongoose.model('User', userSchema)
export default User
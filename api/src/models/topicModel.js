import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true
  },
  vocabularys: [
    {
      vocabularyId: mongoose.Schema.Types.ObjectId
    }
  ],
  conversation: [
    {
      conversationId: mongoose.Schema.Types.ObjectId
    }
  ],
  questions: [
    {
      questionId: mongoose.Schema.Types.ObjectId
    }
  ]
})

const Topic = mongoose.model('Topic', topicSchema)
export default Topic
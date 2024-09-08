import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true
  },
  vocabularyIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vocabulary'
    }
  ],
  conversationIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    }
  ],
  questionIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ],
  examIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam'
    }
  ],
  step: {
    // ['Tạo chủ đề', 'Luyện từ vựng', 'Luyện đoạn hội thoại', 'Hoàn thành']
    type: Number,
    default: 1
  }
})

const Topic = mongoose.model('Topic', topicSchema)
export default Topic
import mongoose from 'mongoose'

const vocabularySchema = new mongoose.Schema({
  word: {
    type: String
  },
  pronunciation: {
    type: String
  },
  difficulty: {
    type: String
  },
  similarityHistory: [
    {
      similarity: {
        type: String
      },
      time: {
        type: Date
      }
    }
  ],
  questionHistory: [
    {
      value: {
        type: Boolean
      },
      time: {
        type: Date
      }
    }
  ],
  meaning: {
    type: String
  },
  part_of_speech: {
    type: String
  },
  example: {
    type: String
  },
  translate: {
    type: String
  }
})

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema)
export default Vocabulary
import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
  question: {
    type: String
  },
  correctAnswer: {
    type: String
  },
  A: {
    type: String
  },
  B: {
    type: String
  },
  C: {
    type: String
  },
  D: {
    type: String
  }
})

const Question = mongoose.model("Question", questionSchema)
export default Question
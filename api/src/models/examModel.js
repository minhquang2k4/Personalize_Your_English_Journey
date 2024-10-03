import mongoose from "mongoose"

const examSchema = new mongoose.Schema({
  questionIDs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  score: [
    {
      type: Number
    }
  ]
})

const Exam = mongoose.model("Exam", examSchema)

export default Exam
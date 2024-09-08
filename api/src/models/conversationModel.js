import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
  name: {
    type: String
  },
  content: {
    type: String
  },
  translate: {
    type: String
  }
})

const Conversation = mongoose.model("Conversation", conversationSchema)
export default Conversation
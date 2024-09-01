import { GoogleGenerativeAI } from '@google/generative-ai' 
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.API_KEY

export const create = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY)
    const dataTemplate = {
      "vocabularys": [
        {
          "word": "attend",
          "pronunciation": "/əˈtɛnd/",
          "meaning": "tham gia",
          "part_of_speech": "verb",
          "example": "I will attend the meeting tomorrow", 
          "translate": "Tôi sẽ tham gia cuộc họp ngày mai"
        }
      ],
      "conversation": [
        {
          "name": "Nancy",
          "content": "Hello, I'm Nancy. What's your name?",
          "translate": "Xin chào, tôi là Nancy. Bạn tên gì?"
        },
        {
          "name": "John",
          "content": "Hi, I'm John. Nice to meet you.",
          "translate": "Chào, tôi là John. Rất vui được gặp bạn."
        }
      ],
      "questions": [
        {
          "question": "What's your name?",
          "correctAnswer": "A",
          "A": "Nancy",
          "B": "John",
          "C": "Peter",
          "D": "Marry"
        }
      ]
    }
    
    const dataJsonTemplate = JSON.stringify(dataTemplate, null, 2)

    const topic = req.body.topic
    console.log("🚀 ~ create ~ topic:", topic)
    

    const msg = `tạo dữ liệu theo mẫu json 
    ${dataJsonTemplate}
    về chủ đề ${topic}, gồm khoảng 10-15 từ mới và đoạn hội thoại ít nhất 10 câu.
    đưa ra 5 câu hỏi về nội dung đoạn hội thoại.`

    async function run() {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const chat = model.startChat()
        const result = await chat.sendMessage(msg)
        const response = await result.response
        const text = response.text()
        let jsonObject = {}
        try {
          let jsonString = text.replace(/^[^{]*\{/, '{')
          jsonString = jsonString.replace(/\}[^}]*$/, '}')
          jsonObject = JSON.parse(jsonString)
        } catch (error) {
          return res.status(500).json({ message: error.message })
        }
        res.status(200).json({ message: jsonObject })
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }
    }
    run()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
import UserModel from '../models/userModel.js'
import TopicModel from '../models/topicModel.js'
import VocabularyModel from '../models/vocabularyModel.js'
import ConversationModel from '../models/conversationModel.js'
import QuestionModel from '../models/questionModel.js'

import { GoogleGenerativeAI } from '@google/generative-ai' 
import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.API_KEY

export const create = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY)
    // const dataTemplate = {
    //   "vocabularys": [
    //     {
    //       "word": "attend",
    //       "pronunciation": "/əˈtɛnd/",
    //       "meaning": "tham gia",
    //       "part_of_speech": "verb",
    //       "example": "I will attend the meeting tomorrow", 
    //       "translate": "Tôi sẽ tham gia cuộc họp ngày mai"
    //     }
    //   ],
    //   "conversation": [
    //     {
    //       "name": "Nancy",
    //       "content": "Hello, I'm Nancy. What's your name?",
    //       "translate": "Xin chào, tôi là Nancy. Bạn tên gì?"
    //     },
    //     {
    //       "name": "John",
    //       "content": "Hi, I'm John. Nice to meet you.",
    //       "translate": "Chào, tôi là John. Rất vui được gặp bạn."
    //     }
    //   ],
    //   "questions": [
    //     {
    //       "question": "What's your name?",
    //       "correctAnswer": "A",
    //       "A": "Nancy",
    //       "B": "John",
    //       "C": "Peter",
    //       "D": "Marry"
    //     }
    //   ]
    // }

    const vocabularyTemplate = {
      "vocabularys": [
        {
          "word": "motorcycle",
          "pronunciation": "/ˈmoʊtərˌsaɪkəl/",
          "meaning": "xe máy",
          "part_of_speech": "noun",
          "example": "He rides a motorcycle",
          "translate": "Anh ấy chạy xe máy"
        },
        {
          "word": "bicycle",
          "pronunciation": "/ˈbaɪsɪkəl/",
          "meaning": "xe đạp",
          "part_of_speech": "noun",
          "example": "I like to ride a bicycle",
          "translate": "Tôi thích đi xe đạp"
        },
        {
          "word": "conference",
          "pronunciation": "/ˈkɒnfərəns/",
          "meaning": "hội nghị",
          "part_of_speech": "noun",
          "example": "The conference will be held in the hotel",
          "translate": "Hội nghị sẽ được tổ chức tại khách sạn"
        },
        {
          "word": "truck",
          "pronunciation": "/trʌk/",
          "meaning": "xe tải",
          "part_of_speech": "noun",
          "example": "The truck is carrying goods",
          "translate": "Xe tải đang chở hàng hóa"
        }
      ]
    }

    const conversationTemplate = {
      "conversation": [
        {
          "name": "Alice",
          "content": "Hi, Bob. What are you doing?",
          "translate": "Chào Bob, bạn đang làm gì vậy?"
        },
        {
          "name": "Bob",
          "content": "Hi, Alice. I'm just looking at some cars.",
          "translate": "Chào Alice, tôi chỉ đang xem một số chiếc xe hơi."
        },
        {
          "name": "Alice",
          "content": "Oh, that's cool. What kind of cars are you looking at?",
          "translate": "Ồ, thật tuyệt. Bạn đang xem loại xe gì vậy?"          
        }
      ]
    }

    const questionTemplate = {
      "questions": [
        {
          "question": "What kind of cars is Bob looking at?",
          "correctAnswer": "B",
          "A": "Sedans and coupes",
          "B": "Sports cars and SUVs",
          "C": "Trucks and vans",
          "D": "Motorcycles and bicycles"
        },
        {
          "question": "Why does Alice want an SUV?",
          "correctAnswer": "C",
          "A": "Because she likes to go off-roading",
          "B": "Because she needs a lot of space for her luggage",
          "C": "Because she needs a safe and spacious vehicle for her family",
          "D": "Because she wants to impress her friends"
        }
      ]
    }
    
    const vocabularyJsonTemplate = JSON.stringify(vocabularyTemplate, null, 2)
    const conversationJsonTemplate = JSON.stringify(conversationTemplate, null, 2)
    const questionJsonTemplate = JSON.stringify(questionTemplate, null, 2)

    // const dataJsonTemplate = JSON.stringify(dataTemplate, null, 2)

    const topic = req.body.topicName
    const email = req.user.email


    // const msg = `tạo dữ liệu theo mẫu json 
    // ${dataJsonTemplate}
    // về chủ đề ${topic}, gồm khoảng 15 từ mới và đoạn hội thoại ít nhất 10 câu.
    // đưa ra 5 câu hỏi về nội dung đoạn hội thoại.`

    // console.log("🚀 ~ create ~ msg:", msg)

    const msg1= `Tạo dữ liệu khoảng 12 từ vựng về chủ đề ${topic} theo mẫu json
    ${vocabularyJsonTemplate}`
    console.log("🚀 ~ create ~ msg1:", msg1)

    const msg2 = `Tạo đoạn hội thoại bằng tiếng anh khoảng 12 lượt hội thoại về chủ đề ${topic} sử dụng những từ vựng ở trên theo mẫu json
    ${conversationJsonTemplate}.`
    console.log("🚀 ~ create ~ msg2:", msg2)

    const msg3 = `Tạo 5 câu hỏi về nội dung đoạn hội thoại trên theo mẫu json
    ${questionJsonTemplate}`
    console.log("🚀 ~ create ~ msg3:", msg3)

    let vocabularys = []
    let conversation = []
    let questions = []

    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const chat = model.startChat()

      const result1 = await chat.sendMessage(msg1)
      const response1 = await result1.response
      const text1 = response1.text()
      let jsonObject1 = {}
      try {
        let jsonString1 = text1.replace(/^[^{]*\{/, '{')
        jsonString1 = jsonString1.replace(/\}[^}]*$/, '}')
        jsonObject1 = JSON.parse(jsonString1)
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }

      vocabularys = jsonObject1.vocabularys
      console.log("🚀 ~ run ~ vocabularys:", vocabularys)

      const result2 = await chat.sendMessage(msg2)
      const response2 = await result2.response
      const text2 = response2.text()
      let jsonObject2 = {}
      try {
        let jsonString2 = text2.replace(/^[^{]*\{/, '{')
        jsonString2 = jsonString2.replace(/\}[^}]*$/, '}')
        jsonObject2 = JSON.parse(jsonString2)
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }

      conversation = jsonObject2.conversation
      console.log("🚀 ~ run ~ conversation:", conversation)

      const result3 = await chat.sendMessage(msg3)
      const response3 = await result3.response
      const text3 = response3.text()
      let jsonObject3 = {}
      try {
        let jsonString3 = text3.replace(/^[^{]*\{/, '{')
        jsonString3 = jsonString3.replace(/\}[^}]*$/, '}')
        jsonObject3 = JSON.parse(jsonString3)
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }

      questions = jsonObject3.questions
      console.log("🚀 ~ run ~ questions:", questions)
    }

    await run()

    const user = await UserModel.findOne({ email })

    // create new topic
    const newTopic = new TopicModel({
      topicName: topic,
      vocabularys: [],
      conversation: [],
      questions: []
    })

    // create new vocabularys
    for (let vocabulary of vocabularys) {
      const newVocabulary = new VocabularyModel({
        word: vocabulary.word,
        pronunciation: vocabulary.pronunciation,
        meaning: vocabulary.meaning,
        part_of_speech: vocabulary.part_of_speech,
        example: vocabulary.example,
        translate: vocabulary.translate
      })
      await newVocabulary.save()
      newTopic.vocabularys.push(newVocabulary._id)
    }

    // create new conversation
    for (let conv of conversation) {
      const newConversation = new ConversationModel({
        name: conv.name,
        content: conv.content,
        translate: conv.translate
      })
      await newConversation.save()
      newTopic.conversation.push(newConversation._id)
    }

    // create new questions
    for (let question of questions) {
      const newQuestion = new QuestionModel({
        question: question.question,
        correctAnswer: question.correctAnswer,
        A: question.A,
        B: question.B,
        C: question.C,
        D: question.D
      })
      await newQuestion.save()
      newTopic.questions.push(newQuestion._id)
    }

    await newTopic.save()

    user.topicIDs.push(newTopic._id)
    await user.save()

    res.status(201).json({ topicId: newTopic._id })

    // async function run() {
    //   try {
    //     const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    //     const chat = model.startChat()
    //     const result = await chat.sendMessage(msg)
    //     const response = await result.response
    //     const text = response.text()
    //     let jsonObject = {}
    //     try {
    //       let jsonString = text.replace(/^[^{]*\{/, '{')
    //       jsonString = jsonString.replace(/\}[^}]*$/, '}')
    //       console.log("🚀 ~ run ~ jsonString:", jsonString)
    //       jsonObject = JSON.parse(jsonString)
    //     } catch (error) {
    //       return res.status(500).json({ message: error.message })
    //     }
        
    //     const vocabularys = jsonObject.vocabularys
    //     console.log("🚀 ~ run ~ vocabularys:", vocabularys)
    //     const conversation = jsonObject.conversation
    //     console.log("🚀 ~ run ~ conversation:", conversation)
    //     const questions = jsonObject.questions
    //     console.log("🚀 ~ run ~ questions:", questions)
        

    //     res.status(200).json({ vocabularys, conversation, questions })
    //   } catch (error) {
    //     return res.status(500).json({ message: error.message })
    //   }
    // }
    // run()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


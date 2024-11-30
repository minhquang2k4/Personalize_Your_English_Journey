import UserModel from '../models/userModel.js'
import TopicModel from '../models/topicModel.js'
import VocabularyModel from '../models/vocabularyModel.js'
import ConversationModel from '../models/conversationModel.js'
import QuestionModel from '../models/questionModel.js'
import ExamModel from '../models/examModel.js'

import { GoogleGenerativeAI } from '@google/generative-ai' 
import dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.API_KEY

export const getAll = async (req, res) => {
  try {
    const email = req.user.email

    const user = await UserModel.findOne({ email }).populate('topicIDs')
  
    // populate sẽ thay thế các topicId bằng thông tin chi tiết của topic (dựa trên ref: 'Topic')
    const topics = user.topicIDs
    return res.status(200).json({ topics }) 
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getDetail = async (req, res) => {
  try {
    const topicId = req.params.id
    const topic = await TopicModel.findOne({ _id: topicId }).populate('vocabularyIDs').populate('conversationIDs').populate('questionIDs')
    return res.status(200).json({ topic })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getVocabulary = async (req, res) => {
  try {
    const topicId = req.params.id
    const topic = await TopicModel.findOne({ _id: topicId }).populate('vocabularyIDs')
    const vocabularies = topic.vocabularyIDs
    
    return res.status(200).json({ vocabularies })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const create = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY)

    const vocabularyTemplate = {
      "vocabularies": [
        {
          "word": "motorcycle",
          "pronunciation": "/ˈmoʊtərˌsaɪkəl/",
          "difficulty": "B1",
          "meaning": "xe máy",
          "part_of_speech": "noun",
          "example": "He rides a motorcycle",
          "translate": "Anh ấy chạy xe máy"
        },
        {
          "word": "bicycle",
          "pronunciation": "/ˈbaɪsɪkəl/",
          "difficulty": "A1",
          "meaning": "xe đạp",
          "part_of_speech": "noun",
          "example": "I like to ride a bicycle",
          "translate": "Tôi thích đi xe đạp"
        },
        {
          "word": "conference",
          "pronunciation": "/ˈkɒnfərəns/",
          "difficulty": "B2",
          "meaning": "hội nghị",
          "part_of_speech": "noun",
          "example": "The conference will be held in the hotel",
          "translate": "Hội nghị sẽ được tổ chức tại khách sạn"
        },
        {
          "word": "run",
          "pronunciation": "/rʌn/",
          "difficulty": "A1",
          "meaning": "chạy",
          "part_of_speech": "verb",
          "example": "She runs every morning to stay fit.",
          "translate": "Cô ấy chạy mỗi sáng để giữ dáng."
        },
        {
          "word": "eat",
          "pronunciation": "/iːt/",
          "difficulty": "A1",
          "meaning": "ăn",
          "part_of_speech": "verb",
          "example": "We eat dinner at 7 PM every day.",
          "translate": "Chúng tôi ăn tối lúc 7 giờ mỗi ngày."
        },
        {
          "word": "beautiful",
          "pronunciation": "/ˈbjuːtɪfəl/",
          "difficulty": "B1",
          "meaning": "đẹp",
          "part_of_speech": "adjective",
          "example": "The garden is beautiful in the spring.",
          "translate": "Khu vườn rất đẹp vào mùa xuân."
        }
      ]
    }

    // const conversationTemplate = {
    //   "conversation": [
    //     {
    //       "name": "Alice",
    //       "content": "Hi, Bob. What are you doing?",
    //       "translate": "Chào Bob, bạn đang làm gì vậy?"
    //     },
    //     {
    //       "name": "Bob",
    //       "content": "Hi, Alice. I'm just looking at some cars.",
    //       "translate": "Chào Alice, tôi chỉ đang xem một số chiếc xe hơi."
    //     },
    //     {
    //       "name": "Alice",
    //       "content": "Oh, that's cool. What kind of cars are you looking at?",
    //       "translate": "Ồ, thật tuyệt. Bạn đang xem loại xe gì vậy?"          
    //     },
    //     {
    //       "name": "Bob",
    //       "content": "I'm looking at sports cars and SUVs.",
    //       "translate": "Tôi đang xem các loại xe thể thao và SUV."
    //     }
    //   ]
    // }

    // const questionTemplate = {
    //   "questions": [
    //     {
    //       "question": "What kind of cars is Bob looking at?",
    //       "correctAnswer": "B",
    //       "A": "Sedans and coupes",
    //       "B": "Sports cars and SUVs",
    //       "C": "Trucks and vans",
    //       "D": "Motorcycles and bicycles"
    //     },
    //     {
    //       "question": "Why does Alice want an SUV?",
    //       "correctAnswer": "C",
    //       "A": "Because she likes to go off-roading",
    //       "B": "Because she needs a lot of space for her luggage",
    //       "C": "Because she needs a safe and spacious vehicle for her family",
    //       "D": "Because she wants to impress her friends"
    //     },
    //     {
    //       "question": "What is Bob's favorite car?",
    //       "correctAnswer": "A",
    //       "A": "The red sports car",
    //       "B": "The black SUV",
    //       "C": "The blue sedan",
    //       "D": "The white truck"
    //     },
    //     {
    //       "question": "What does Alice think of the blue sedan?",
    //       "correctAnswer": "D",
    //       "A": "She thinks it's too small",
    //       "B": "She thinks it's too expensive",
    //       "C": "She thinks it's too slow",
    //       "D": "She thinks it's a good choice"
    //     },
    //     {
    //       "question": "What does Bob think of the white truck?",
    //       "correctAnswer": "B",
    //       "A": "He thinks it's too big",
    //       "B": "He thinks it's too slow",
    //       "C": "He thinks it's too expensive",
    //       "D": "He thinks it's too loud"
    //     }
    //   ]
    // }
    
    const vocabularyJsonTemplate = JSON.stringify(vocabularyTemplate, null, 2)
    // const conversationJsonTemplate = JSON.stringify(conversationTemplate, null, 2)
    // const questionJsonTemplate = JSON.stringify(questionTemplate, null, 2)

    // const dataJsonTemplate = JSON.stringify(dataTemplate, null, 2)

    const topic = req.body.topicName
    const email = req.user.email


    // const msg = `tạo dữ liệu theo mẫu json 
    // ${dataJsonTemplate}
    // về chủ đề ${topic}, gồm khoảng 15 từ mới và đoạn hội thoại ít nhất 10 câu.
    // đưa ra 5 câu hỏi về nội dung đoạn hội thoại.`

    // console.log("🚀 ~ create ~ msg:", msg)

    const msg1= `Tạo dữ liệu khoảng 30 từ vựng về chủ đề ${topic} theo mẫu json (phải đầy đủ tất cả các trường thông tin)
    ${vocabularyJsonTemplate}`
    // console.log("🚀 ~ create ~ msg1:", msg1)

    // const msg2 = `Tạo đoạn hội thoại bằng tiếng anh khoảng 15 lượt hội thoại về chủ đề ${topic} sử dụng những từ vựng ở trên theo mẫu json (phải đầy đủ tât cả các trường thông tin và thay đổi name khác)
    // ${conversationJsonTemplate}.`
    // console.log("🚀 ~ create ~ msg2:", msg2)

    // const msg3 = `Tạo 5 câu hỏi về nội dung đoạn hội thoại trên theo mẫu json
    // ${questionJsonTemplate}`
    // console.log("🚀 ~ create ~ msg3:", msg3)

    let vocabularies = []
    // let conversation = []
    // let questions = []

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
        // console.log("🚀 ~ run ~ jsonString1:", jsonString1)
        // console.log("🚀 ~ run ~ jsonObject1:", jsonObject1)
      } catch (error) {
        return res.status(500).json({ message: error.message })
      }

      vocabularies = jsonObject1.vocabularies
      // console.log("🚀 ~ run ~ vocabularies:", vocabularies)

      // const result2 = await chat.sendMessage(msg2)
      // const response2 = await result2.response
      // const text2 = response2.text()
      // let jsonObject2 = {}
      // try {
      //   let jsonString2 = text2.replace(/^[^{]*\{/, '{')
   
      //   jsonString2 = jsonString2.replace(/\}[^}]*$/, '}')
      //   jsonObject2 = JSON.parse(jsonString2)
      // } catch (error) {
      //   return res.status(500).json({ message: error.message })
      // }

      // conversation = jsonObject2.conversation
      // console.log("🚀 ~ run ~ conversation:", conversation)

      // const result3 = await chat.sendMessage(msg3)
      // const response3 = await result3.response
      // const text3 = response3.text()
      // let jsonObject3 = {}
      // try {
      //   let jsonString3 = text3.replace(/^[^{]*\{/, '{')
      //   jsonString3 = jsonString3.replace(/\}[^}]*$/, '}')
      //   jsonObject3 = JSON.parse(jsonString3)
      // } catch (error) {
      //   return res.status(500).json({ message: error.message })
      // }

      // questions = jsonObject3.questions
      // console.log("🚀 ~ run ~ questions:", questions)
    }

    await run()
    
    // check data
    // 
    // 

    const user = await UserModel.findOne({ email })

    // create new topic
    const newTopic = new TopicModel({
      topicName: topic,
      vocabularyIDs: [],
      conversationIDs: [],
      questionIDs: [],
      examIDs: [],
      step: 1
    })

    // create new vocabularies
    for (let vocabulary of vocabularies) {
      const newVocabulary = new VocabularyModel({
        word: vocabulary.word,
        pronunciation: vocabulary.pronunciation,
        difficulty: vocabulary.difficulty,
        meaning: vocabulary.meaning,
        part_of_speech: vocabulary.part_of_speech,
        example: vocabulary.example,
        translate: vocabulary.translate
      })
      await newVocabulary.save()
      newTopic.vocabularyIDs.push(newVocabulary._id)
    }

    // create new conversation
    // for (let conv of conversation) {
    //   const newConversation = new ConversationModel({
    //     name: conv.name,
    //     content: conv.content,
    //     translate: conv.translate
    //   })
    //   await newConversation.save()
    //   newTopic.conversationIDs.push(newConversation._id)
    // }

    // create new questions
    // for (let question of questions) {
    //   const newQuestion = new QuestionModel({
    //     question: question.question,
    //     correctAnswer: question.correctAnswer,
    //     A: question.A,
    //     B: question.B,
    //     C: question.C,
    //     D: question.D
    //   })
    //   await newQuestion.save()
    //   newTopic.questionIDs.push(newQuestion._id)
    // }

    await newTopic.save()

    user.topicIDs.push(newTopic._id)
    await user.save()

    return res.status(201).json({ topicId: newTopic._id })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createExam = async (req, res) => {
  try {
    const topicId = req.params.id
    const vocabularies = await TopicModel.findOne({ _id: topicId }).populate('vocabularyIDs').select('vocabularyIDs')

    const topic = await TopicModel.findOne({ _id: topicId })
    let data = [] 
    
    for (let vocabulary of vocabularies.vocabularyIDs) {
      data.push({
        word: vocabulary.word,
        meaning: vocabulary.meaning
      })
    }
    
    const dataJson = JSON.stringify(data, null, 2)

    const resTemplate = `[
      {
        "question": "'Library' is a place where you can borrow books?",
        "correctAnswer": "A",
        "A": "true",
        "B": "false"
      },
      {
        "question": "Fill in the blank: He went to the ________ to mail a letter.",
        "correctAnswer": "D",
        "A": "library",
        "B": "restaurant",
        "C": "school",
        "D": "post office"
      },
      {
        "question": "What is the meaning of 'Library'?",
        "correctAnswer": "A",
        "A": "Thư viện",
        "B": "Bảo tàng",
        "C": "Nhà hàng",
        "D": "Trường đại học"
      },
      {
        "question": "'Police station' is a type of library?",
        "correctAnswer": "B",
        "A": "true",
        "B": "false"
      },
      {
        "question": "Fill in the blank: The children are playing in the ________.",
        "correctAnswer": "C",
        "A": "hospital",
        "B": "museum",
        "C": "park",
        "D": "school"
      }
    ]`

    const msg = `Dựa vào data từ vựng sau:${dataJson}.
    Hãy tạo 1 bộ câu hỏi trắc nhiệm tiếng anh khoảng 15 đến 20 câu hỏi (đầu ra ở dạng json) cho các từ vựng trên, theo các dạng câu hỏi có 4 đáp án hoặc câu hỏi true false hoặc dạng điền vào chỗ trống theo mẫu json sau: ${resTemplate}`
   
    // console.log("🚀 ~ exam ~ msg:", msg)

    const genAI = new GoogleGenerativeAI(API_KEY)

    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const chat = model.startChat()

      const result = await chat.sendMessage(msg)
      const response = await result.response
      const text = response.text()
      // console.log("🚀 ~ run ~ text:", text)
      const start = text.indexOf('[')
      const end = text.lastIndexOf(']') + 1
      
      let jsonString = text.substring(start, end)
      
      let jsonObject = JSON.parse(jsonString)
      // console.log("🚀 ~ run ~ jsonObject:", jsonObject)

      const exam = new ExamModel(
        {
          questionIDs: []
        }
      )

      // lưu câu hỏi vào db
      for (let question of jsonObject) {
        const newQuestion = new QuestionModel({
          question: question.question,
          correctAnswer: question.correctAnswer,
          A: question.A,
          B: question.B,
          C: question.C ? question.C : '',
          D: question.D ? question.D : ''
        })
        await newQuestion.save()
        exam.questionIDs.push(newQuestion._id)
      }

      await exam.save()
      await topic.examIDs.push(exam._id)
      topic.save()

      return res.status(200).json({ examID: exam._id })
    }

    await run()
  }
  catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllExam = async (req, res) => {
  try {
    const topicId = req.params.id
    const topic = await TopicModel.findOne({ _id: topicId }).populate('examIDs').select('examIDs')
    return res.status(200).json({ topic })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getExamDetail = async (req, res) => {
  try {
    const examId = req.params.examId
    const questions = await ExamModel.findOne({ _id: examId }).populate('questionIDs').select('questionIDs')
    const exam = await ExamModel.findOne({ _id: examId })
    // console.log("🚀 ~ getExamDetail ~ exam:", exam)
    return res.status(200).json({ questions, exam })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const submitExam = async (req, res) => {
  try {
    const answers = req.body.answers
    const score = req.body.score
    const examId = req.params.examId

    const exam = await ExamModel.findOne({ _id: examId })
    exam.score.push(score)
    await exam.save()

    const questionIDs = await ExamModel.findOne({ _id: examId }).select('questionIDs')

    for (let i = 0; i < questionIDs.questionIDs.length; i++) {

      const question = await QuestionModel.findOne({ _id: questionIDs.questionIDs[i] })

      if (!answers[i]) {
        question.answer.push(null)
      } else {
        question.answer.push(answers[i])
      }

      await question.save()

    }

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const addVoca = async (req, res) => {
  try {
    const id = req.params.id
    const topic = await TopicModel.findOne({ _id: id })

    // console.log("🚀 ~ addVoca ~ topic:", topic)
    
    const { word, meaning } = req.body
    const data = `
    {
        "word": "${word}",
        "pronunciation": "/.../",
        "difficulty": "A1/A2/B1/B2/C1/C2",
        "meaning": "${meaning}",
        "part_of_speech": "noun/verb/adjective",
        "example": "",
        "translate": ""
    }`

    const msg = `Hoàn thiện thông tin từ vựng (đầy đủ thông tin các trường) theo mẫu json ${data}`

    // console.log("🚀 ~ addVoca ~ msg:", msg)
    const genAI = new GoogleGenerativeAI(API_KEY)

    async function run() {
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
        // console.log("🚀 ~ run ~ jsonString1:", jsonString)
        // console.log("🚀 ~ run ~ jsonObject1:", jsonObject)

        const newVocabulary = new VocabularyModel({
          word: jsonObject.word,
          pronunciation: jsonObject.pronunciation,
          difficulty: jsonObject.difficulty,
          meaning: jsonObject.meaning,
          part_of_speech: jsonObject.part_of_speech,
          example: jsonObject.example,
          translate: jsonObject.translate
        })

        await newVocabulary.save()
        topic.vocabularyIDs.push(newVocabulary._id)
        await topic.save()
        return res.status(200).json({ message: 'ok' })

      } catch (error) {
        return res.status(500).json({ message: error.message })
      }
    }
    
    await run()

  } catch (error) {
    return res.status(500).json({ message: error.message }) 
  }
}

export const saveSimilarityHistory = async (req, res) => {
  try {
    const similarity = req.body.similarity
    const wordId = req.body.wordId

    const vocabulary = await VocabularyModel.findOne({ _id: wordId })
    vocabulary.similarityHistory.push({ similarity, time: new Date() })
    await vocabulary.save()

    return res.status(200).json({ message: 'ok' })

  } catch (error) {
    return res.status(500).json({ message: error.message })
    
  }
  

}

export const saveQuestionHistory = async (req, res) => {
  try {
    const { wordId, value } = req.body
    // console.log("🚀 ~ saveQuestionHistory ~  wordId, value:", wordId, value)
    const vocabulary = await VocabularyModel.findOne({ _id: wordId })
    vocabulary.questionHistory.push({ value, time: new Date() })
    await vocabulary.save()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

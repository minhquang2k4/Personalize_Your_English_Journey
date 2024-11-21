import UserModel from '../models/userModel.js'
import TopicModel from '../models/topicModel.js'
import VocabularyModel from '../models/vocabularyModel.js'

export const getDetailUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email })
    return res.status(200).json({ email: user.email, userName: user.userName })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getHissoryPractice = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email })
    let topicIDs = user.topicIDs
    const topic = await TopicModel.find({ _id: { $in: topicIDs } })

    const vocaIDs = topic.reduce((acc, topic) => {
      return acc.concat(topic.vocabularyIDs)
    }, [])
  
    const voca = await VocabularyModel.find({ _id: { $in: vocaIDs } })

    const formatTime = (isoTime) => {
      const date = new Date(isoTime)
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }
      return date.toLocaleString('vi-VN', options)
    }

    const historyPronunciation = voca
      .filter(voca => voca.similarityHistory.length > 0)
      .flatMap(voca => 
        voca.similarityHistory.map(history => ({
          word: voca.word,
          difficulty: voca.difficulty,
          meaning: voca.meaning,
          time: formatTime(history.time),
          similarity: parseFloat(history.similarity).toFixed(2)
        }))
      )

    const historyQuestion = voca
      .filter(voca => voca.questionHistory.length > 0)
      .flatMap(voca => 
        voca.questionHistory.map(history => ({
          word: voca.word,
          difficulty: voca.difficulty,
          meaning: voca.meaning,
          time: formatTime(history.time),
          value: history.value
        }))
      )

    
    return res.status(200).json({ historyPronunciation, historyQuestion })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
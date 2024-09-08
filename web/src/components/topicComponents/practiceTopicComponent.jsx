import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

// MUI
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import MicIcon from '@mui/icons-material/Mic'
// UI Components
import Loader from '../loader'

// Functions
import textToSpeech from '../../functions/textToSpeech'
import CheckSimilarity from '../../functions/checkSimilarity'


export default function PracticeTopicComponent() {
  const API_URL = import.meta.env.VITE_API_URL
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [vocabularies, setVocabularies] = useState([])
  const [flashcard, setFlashcard] = useState({ flipped: false })
  const [translate, setTranslate] = useState(0)
  const [disableAnimation, setDisableAnimation] = useState(false)
  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState([{ meaning: '', correct: false, color: 'none' }])
  const [open, setOpen] = useState(false)

  const [value, setValue] = useState('1')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${API_URL}/topics/yourtopic/${id}/practice`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        const firstVocab = response.data.vocabularies[0]
        setVocabularies(response.data.vocabularies)
        setFlashcard({ word: firstVocab.word, meaning: firstVocab.meaning, flipped: false })
        setQuestion({ word: firstVocab.word, meaning: firstVocab.meaning })
      }
      catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [API_URL, id])

  useEffect(() => {

    if (vocabularies.length > 0) {
      const randomVocab = vocabularies
        .filter(vocab => vocab.meaning !== question.meaning)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(vocab => vocab.meaning)

      const answer = randomVocab.map(meaning => ({ meaning, correct: false, color: 'none' }))
      

      const allAnswers = [...answer, { meaning: question.meaning, correct: true, color: 'none' }]
        .sort(() => 0.5 - Math.random())

      setAnswers(allAnswers)
    }
  }, [question])


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleFlip = () => {
    setFlashcard((prevFlashcard) => ({ ...prevFlashcard, flipped: !prevFlashcard.flipped }))
  }

  const handlePrevious = () => {
    setTranslate(100)
    setDisableAnimation(true)
    setTimeout(() => {
      const currentIndex = vocabularies.findIndex((vocab) => vocab.word === flashcard.word)
      if (currentIndex === 0) {
        setTranslate(0)
        return
      }
      const previousVocab = vocabularies[currentIndex - 1]
      setFlashcard({ word: previousVocab.word, meaning: previousVocab.meaning, flipped: false })
      setTimeout(() => setDisableAnimation(false), 0)
      setTranslate(0)
    }, 50)
  }

  const handleNext = () => {
    setTranslate(-100)
    setDisableAnimation(true)
    setTimeout(() => {
      const currentIndex = vocabularies.findIndex((vocab) => vocab.word === flashcard.word)
      if (currentIndex === vocabularies.length - 1) {
        setTranslate(0)
        return
      }
      const nextVocab = vocabularies[currentIndex + 1]
      setFlashcard({ word: nextVocab.word, meaning: nextVocab.meaning, flipped: false })
      setTimeout(() => setDisableAnimation(false), 0)
      setTranslate(0)
    }, 50)
  }

  const handleMic = () => {
    setOpen(true)
  }
  
  const handleQuestion = async (index) => {
    if (answers[index].correct) {
          
      setAnswers(answers.map((answer, i) => {
        if (i === index) {
          return { ...answer, color: '#81c784' }
        }
        return answer
      }))
      
      await new Promise(resolve => setTimeout(resolve, 500))

      const currentIndex = vocabularies.findIndex((vocab) => vocab.word === question.word)
      if (currentIndex === vocabularies.length - 1) {
        return
      }
      const nextVocab = vocabularies[currentIndex + 1]
      setQuestion({ word: nextVocab.word, meaning: nextVocab.meaning })
    }
    else {
      setAnswers(answers.map((answer, i) => {
        if (i === index) {
          return { ...answer, color: '#ef5350' }
        }
        return answer
      }))

      await new Promise(resolve => setTimeout(resolve, 500))
      // chuyển lại thành màu none
      setAnswers(answers.map((answer) => {
        return { ...answer, color: 'none' }
      }))

    }
  }


  return (
    <Box sx={{
      backgroundColor: 'white',
      margin: 'auto',
      borderRadius: '3px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {loading && <Loader />}
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Flashcard" value="1" />
            <Tab label="Question" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ height: '761px' }} >
          <CheckSimilarity open={open} setOpen={setOpen} data={flashcard.word} />
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            gap: '100px'
          }}>
            <Box
              sx={{
                width: '500px',
                height: '300px',
                perspective: '1000px',
                cursor: 'pointer',
                '@media (max-width: 600px)': {
                  width: '300px',
                  height: '200px'
                },
                transform: `translateX(${translate}px)`,
                transition: 'transform 0.2s'
              }}
              onClick={handleFlip} 
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: disableAnimation ? 'none' : 'transform 0.2s',
                  transform: flashcard.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front of flashcard */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#42a5f5',
                    border: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px'
                  }}
                >
                  <Typography variant='h3' component='h2' >{flashcard.word}</Typography>
                </Box>
                {/* Back of flashcard */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#90caf9',
                    border: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotateY(180deg)',
                    borderRadius: '20px'
                  }}
                >
                  <Typography variant='h4' component='h2' sx={{ margin: '15px' }} >{flashcard.meaning}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{
              display: 'flex',
              gap: '50px',
              '@media (max-width: 600px)': {
                gap: '20px'
              }
            }} >
              <Button variant="outlined" sx={{ padding: '10px 30px' }} onClick={handlePrevious} >
                <ArrowBackIosNewIcon />
              </Button>
              <Button variant="outlined" sx={{ padding: '10px 30px' }} onClick={() => textToSpeech(flashcard.word)}>
                <VolumeUpIcon />
              </Button>
              <Button variant="outlined" sx={{ padding: '10px 30px' }} onClick={() => handleMic()}>
                <MicIcon />
              </Button>
              <Button variant="outlined" sx={{ padding: '10px 30px' }} onClick={handleNext} >
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="2" sx={{ height: '761px' }} >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            gap: '100px',
            '@media (max-width: 600px)': {
              gap: '20px'
            }
            
          }}>
            <Box
              sx={{
                width: '500px',
                height: '300px',
                perspective: '1000px',
                backgroundColor: '#42a5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '20px',
                border: '1px solid #ddd',
                '@media (max-width: 600px)': {
                  width: '300px',
                  height: '200px'
                }
              }}
            >
              <Typography variant='h3' component='h2' >
                {question.word}
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              gap: '50px',  
              '@media (max-width: 600px)': {
                flexDirection: 'column',
                gap: '20px'
              } }}>
              {answers.map((answer, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{
                    padding: '10px 30px',
                    backgroundColor: answer.color

                  }}
                  onClick={() => { 
                    handleQuestion(index)
                  }}
                >
                  {answer.meaning}
                </Button>
              ))}
              {/* <Button
                variant="outlined"
                sx={{ 
                  padding: '10px 30px',
                  // backgroundColor: 
                }}
                onClick={() => { 
                  handleQuestion(0)
                } }
              >
                {answers[0].meaning}
              </Button>
              <Button
                variant="outlined"
                sx={{ 
                  padding: '10px 30px',
                  // backgroundColor: 
                }}
                onClick={(e) => { 
                  handleQuestion(1)
                } }
              >
                {answers[1].meaning}
              </Button>
              <Button
                variant="outlined"
                sx={{ 
                  padding: '10px 30px',
                  // backgroundColor: 
                }}
                onClick={(e) => { 
                  handleQuestion(2)
                } }
              >
                {answers[2].meaning}
              </Button>
              <Button
                variant="outlined"
                sx={{ 
                  padding: '10px 30px',
                  // backgroundColor: 
                }}
                onClick={(e) => { 
                  handleQuestion(3)
                } }
              >
                {answers[3].meaning}
              </Button> */}
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

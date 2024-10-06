import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import _ from 'lodash'

// UI Components
import Loader from '../loader'
import SubmitExam from '../submitExam'

// MUI
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'

const DetailExamComponent = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const { id, examID } = useParams()

  const [open, setOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15*60)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState(Array(50).fill(null))
  const [score, setScore] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/topics/yourtopic/${id}/${examID}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        setQuestions(response.data.questions.questionIDs)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const handleAnswerChange = async (questionIndex, answer) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answer
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    setOpen(true)
    let score = 0

    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        score += 1
      }
    }
    score = _.round(score / questions.length * 100, 2)
    console.log("🚀 ~ handleSubmit ~ questions.length:", questions.length)
    setScore( score )

    try {
      await axios.post(`${API_URL}/topics/yourtopic/${id}/${examID}`, {
        answers: answers,
        score: score
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Box sx={{
      backgroundColor: 'white',
      margin: 'auto',
      borderRadius: '3px',
      minHeight: '90vh',
      maxHeight: '90vh',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'auto'
    }}>
      { loading && <Loader /> }

      <SubmitExam open={open} setOpen={setOpen} score={score} />


      <Box
        sx={{
          textAlign: 'center',
          padding: '10px',
          fontSize: '18px',
          fontWeight: 'bold'
        }}
      >
        Thời gian còn lại: {formatTime(timeLeft)}
      </Box>

      { questions.map((question, index) => (
        <Box key={index} sx={{
          padding: '10px',
          borderBottom: '1px solid #f5f5f5',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}>
          <p>Question {index + 1}: {question.question}</p>
          <RadioGroup
            aria-labelledby={`question-${index}-label`}
            name={`question-${index}`}
            value={answers[index] || ''}
            onChange={(event) => handleAnswerChange(index, event.target.value)}
          >
            {question.A && <FormControlLabel value="A" control={<Radio />} label={question.A} />}
            {question.B && <FormControlLabel value="B" control={<Radio />} label={question.B} />}
            {question.C && <FormControlLabel value="C" control={<Radio />} label={question.C} />}
            {question.D && <FormControlLabel value="D" control={<Radio />} label={question.D} />}
          </RadioGroup>
        </Box>
      )) 
      }
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        <Button 
          variant='contained' 
          sx={{ margin: '10px' }}
          onClick={ () => { handleSubmit() } }
        >Nộp bài</Button>
      </Box>
    </Box>
  )
}

export default DetailExamComponent
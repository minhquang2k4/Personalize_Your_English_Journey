import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

// UI Components
import Loader from '../loader'

// MUI
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const HistoryExamDetailPage = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const location = useLocation()
  const { id, examID, historyID } = useParams()

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/topics/yourtopic/${id}/${examID}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        setQuestions(response.data.questions.questionIDs)  
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

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
      { questions.map((question, index) => {

        let selectedAnswer = question.answer[Number(historyID) - 1]
        let correctAnswer = question.correctAnswer
        console.log("🚀 ~ {questions.map ~ selectedAnswer:", selectedAnswer)
        console.log("🚀 ~ {questions.map ~ correctAnswer:", correctAnswer)
        let isCorrect = selectedAnswer === correctAnswer

        const getAnswerIcon = (option) => {
          if (isCorrect) {
            if (option === selectedAnswer) {
              return <CheckCircleOutlineIcon color='success' />
            } else {
              return null
            }
          }
          
          if (option === selectedAnswer) {
            return <HighlightOffIcon color='error' />
          }

          if (option === correctAnswer) {
            return <CheckCircleOutlineIcon color='success' />
          }
          
        }

        return (
          <Box key={index} sx={{
            padding: '10px',
            borderBottom: '1px solid #f5f5f5',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}>
            <Typography sx={{ display:'flex' }} >{<Typography color={isCorrect ? 'success' : 'error' } >Question {index + 1}</Typography> }: {question.question}</Typography>
            { 
              question.A && 
              (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Typography> {question.A} </Typography> 
                  {getAnswerIcon('A')}
                </Box>
              )
            }
            {
              question.B && 
              (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Typography> {question.B} </Typography> 
                  {getAnswerIcon('B')}
                </Box>
              )
            }
            {
              question.C && 
              (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Typography> {question.C} </Typography> 
                  {getAnswerIcon('C')}
                </Box>
              )
            }
            {
              question.D && 
              (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Typography> {question.D} </Typography> 
                  {getAnswerIcon('D')}
                </Box>
              )
            }
          </Box>
        )
      })}



      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        margin: '10px'
      }} >
        <Button variant='contained' onClick={() => navigate(location.pathname.substring(0, location.pathname.lastIndexOf('/history')))}>Làm lại</Button>
      </Box>
    </Box>
  )
}

export default HistoryExamDetailPage

import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'

// UI Components
import Loader from '../loader'

// MUI
import Box from '@mui/material/Box'

export default function ExamTopicComponent() {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    setLoading(true)

    const fetchExam = async () => {
      try {
        const response = await axios.get(`${API_URL}/topics/yourtopic/${id}/getAllExam`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
  
        console.log(response)
        setLoading(false)
  
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/auth/login')
        }
        if (error.response.status === 403) {
          alert('Sai Token, Vui lòng đăng nhập lại')
          navigate('/auth/login')
        }
        if (error.response.status === 500) {
          alert('Lỗi sever. Vui lòng thử lại sau')
        }
      }
    }
    fetchExam()
  }, [] )

  return (
    <Box sx={{
      backgroundColor: 'white',
      margin: 'auto',
      borderRadius: '3px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      { loading && <Loader /> }
      <button>Tạo bài kiểm tra mới</button>

      <h1>DATASET các bài kiểm tra trước đó</h1>

    </Box>
  )
}
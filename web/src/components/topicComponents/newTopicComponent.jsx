import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'

// UI Components
import Loader from '../loader'

import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

const NewTopic = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  const [topicName, setTopicName] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError(false)
  }, [topicName] )

  const handleSubmit = async () => {
    if (topicName === '') {
      setError(true)
      return
    } else {
      setError(false)
    }

    setLoading(true)

    try {
      const token = Cookies.get('token')
      const response = await axios.post(`${API_URL}/topics/create`, {
        topicName
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      console.log('🚀 ~ handleSubmit ~ response:', response.data)

    } catch (error) {
      if (error.response.status === 401) {
        alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục')
        navigate('/auth/login')
      }
      if (error.response.status === 403) {
        alert('Sai Token, Vui lòng đăng nhập lại')
        navigate('/auth/login')
      }
      if (error.response.status === 500) {
        alert('Lỗi sever. Vui lòng thử lại sau')
      }
    } finally {
      setLoading(false)
    }

  }

  return (
    <Box>
      { loading && <Loader /> }
      {/* work flow */}
      <Box>
        work flow
      </Box>
      {/* tao chu de */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '50px'
      }} >
        <TextField error={error} id="outlined-basic" label="Tên Chủ Đề" variant="outlined" sx={{
          width: '60%',
          '& .MuiOutlinedInput-root': { // MUI chia ra thành các lớp nhỏ Outlined là lớp bao ngoài cùng
            borderRadius: '100px'
          }
        }} 
        onChange={ (e) => {setTopicName(e.target.value)} }/>
        <Button variant="contained" 
          onClick={handleSubmit}
          sx={{
            width: '120px',
            height: '45px',
            borderRadius: '100px',
            backgroundColor: '#FFC107',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#FFA000'
            }
          }}>Tạo Chủ Đề</Button>
      </Box>
    </Box>
  )
}

export default NewTopic
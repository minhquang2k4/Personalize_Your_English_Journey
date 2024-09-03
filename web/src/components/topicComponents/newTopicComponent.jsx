import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

// UI Components
import Loader from '../loader'
import Steper from '../stepper'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

const NewTopic = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const isLogin = localStorage.getItem('islogin')
  const userName = isLogin ? localStorage.getItem('userName').slice(1, -1) : 'Bạn mới'

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
      if (response.status === 201) {
        navigate(`/topics/yourtopic/${response.data.topicId}`)
      }

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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '80px'
    }} >
      { loading && <Loader /> }

      {/* title */}
      <Typography variant='h5' component='div' sx={{
        textAlign: 'center',
        marginTop: '50px',
        marginBottom: '20px'
      }}> Xin chào <b>{userName}</b>. Bạn đang muốn tạo chủ đề mới? </Typography>

      {/* work flow */}
      <Steper step={0} />

      {/* tao chu de */}
      <Box sx={{
        marginTop: '40px',
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
            width: '140px',
            height: '45px',
            borderRadius: '100px',
            backgroundColor: '#FFD700',
            transition: 'all 0.3s ease',
            color: '#000000',
            '&:hover': {
              backgroundColor: '#FFA000',
              color: 'black', // Giữ nguyên màu chữ khi hover
              content: '"+"', // Chữ hiển thị khi hover
              transform: 'scale(1.05)'
            }
          }}> Tạo Chủ Đề</Button>

      </Box>
    </Box>
  )
}

export default NewTopic
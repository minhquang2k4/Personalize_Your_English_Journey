import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { Person as PersonIcon, Email as EmailIcon } from '@mui/icons-material'

const AccountComponent = () => {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/account`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        
        setUserName(response.data.userName)
        setEmail(response.data.email)
        
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
      overflow: 'auto',
      p: 3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={<Typography variant="h5">Thông tin tài khoản</Typography>}
        />
        <Divider />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Typography variant="body1">
              <strong>Tên người dùng:</strong> {userName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Typography variant="body1">
              <strong>Email:</strong> {email}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AccountComponent
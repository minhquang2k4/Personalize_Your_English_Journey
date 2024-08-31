import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
// ACTION
import { LOGIN } from '../../redux/slices/authSlice'
// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'


const LoginComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const isLogin = useSelector((state) => state.auth.isLogin)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (email === '' || password === '') {
      alert('Vui lòng nhập đầy đủ thông tin')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Vui lòng nhập email hợp lệ')
      return
    }

    if (password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      })
      
      if (response.status === 201) {
        Cookies.set('token', response.data.token)
        dispatch(LOGIN(response.data.user))
        alert('Đăng nhập thành công!')
        navigate('/home')
      } else {
        alert('Đăng nhập không thành công. Vui lòng thử lại!')
      }

    } catch (error) {
      switch (error.response.status) {
      case 401:
        alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại!')
        break
      case 400:
        alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!')
        break
      default:
        alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!')
        break
      }
    }
  }

  useEffect(() => {
    if (isLogin) {
      navigate('/home')
    }
  }, [isLogin, navigate])

  return (
    <Box
      sx={{
        width: '450px',
        height: '500px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(100, 100, 100, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        position: 'relative'
      }}
    >
      {/* Title Section */}
      <Typography
        variant='h4'
        component='h1'
        color='primary' 
        sx={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}
      >
        Đăng nhập
      </Typography>

      <Grid container spacing={2} >
        <Grid size={12} >
          <TextField fullWidth label='Email' variant='outlined' required onChange={
            (e) => setEmail(e.target.value)
          }/>
        </Grid>
        <Grid size={12} >
          <TextField fullWidth label='Mật khẩu' variant='outlined' type='password' required onChange={
            (e) => setPassword(e.target.value)
          }/>
        </Grid>

        <Grid size={12} container justifyContent='center'>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: '10px',
              width: '40%',
              marginTop: '30px'
            }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </Grid>
      </Grid>

      <Typography
        variant='body2'
        color='textSecondary'
        sx={{
          position: 'absolute',
          bottom: '40px',
          marginTop: '20px',
          textAlign: 'center'
        }}
      >
        Chưa có tài khoản? <Link to='/register' style={{ color: '#3f51b5' }}>Đăng ký ngay</Link>
      </Typography>
    </Box>
  )
}

export default LoginComponent

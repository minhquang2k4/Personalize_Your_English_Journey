import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const RegisterComponent = () => {
  // const isLogin = useSelector((state) => state.auth.isLogin)
  const isLogin = localStorage.getItem('islogin')
  const navigate = useNavigate()
  
  const API_URL = import.meta.env.VITE_API_URL
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async () => {
    if ( firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '' ) {
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

    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp')
      return
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      })
      
      if (response.status === 201) {
        alert('Đăng ký thành công!')
        navigate('/login')
      } else {
        alert('Đăng ký không thành công. Vui lòng thử lại!')
      }
    } 
    catch (error) {
      switch (error.response.status) {
      case 409:
        alert('Email đã tồn tại. Vui lòng chọn email khác!')
        break
      case 400:
        alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại!')
        break
      default:
        alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!')
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
        height: '600px',
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
        Đăng ký
      </Typography>

      <Grid container spacing={2} >

        <Grid size={6} >
          <TextField label='Họ' variant='outlined' required onChange={
            (e) => setFirstName(e.target.value)
          } />
        </Grid>

        <Grid size={6} >
          <TextField label='Tên' variant='outlined' required onChange={
            (e) => setLastName(e.target.value)
          }/>
        </Grid>

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

        <Grid size={12} >
          <TextField fullWidth label='Xác nhận mật khẩu' variant='outlined' type='password' required onChange={
            (e) => setConfirmPassword(e.target.value)
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
            onClick={handleRegister}
          >
            Đăng ký
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
        Đã có tài khoản? <Link to='/auth/login' style={{ color: '#3f51b5' }}>Đăng nhập</Link>
      </Typography>
    </Box>
  )
}

export default RegisterComponent

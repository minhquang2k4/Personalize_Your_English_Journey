import Box from '@mui/material/Box'
import LoginComponent from '../components/authComponents/loginComponent'

const Login = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#EEF2F6'
      }}
    >
      <LoginComponent />
    </Box>
  )
}

export default Login
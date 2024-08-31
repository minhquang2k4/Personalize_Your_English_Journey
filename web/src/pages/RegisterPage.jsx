import Box from '@mui/material/Box'
import RegisterComponent from '../components/authComponents/registerComponent'

const Register = () => {
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
      <RegisterComponent />
    </Box>
  )
}

export default Register
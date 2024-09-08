// material-ui
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Loader = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      zIndex: 1301,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Box
      sx={{
        width: '40%',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: 24,
        textAlign: 'center'
      }}
    >
      <Typography 
        variant='h4'
        component='h1'
        sx={{
          margin: '30px 0'
        }}
      >Đang lấy dữ liệu</Typography>
      <LinearProgress color="primary" sx={{ margin: '30px' }} />
    </Box>
  </Box>
)

export default Loader
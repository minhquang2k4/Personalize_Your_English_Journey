// material-ui
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

const Loader = () => (
  <Box sx={{ 
    position: 'fixed', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    zIndex: 1301, 
    width: '30%' }}>
    <Box sx={{ margin: 'auto', textAlign: 'center' }} >
      <h1>Đang tạo dữ liệu</h1>
    </Box>
    <LinearProgress color="primary" size="lg" />
  </Box>
)

export default Loader
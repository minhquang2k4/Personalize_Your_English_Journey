import { useNavigate, useLocation } from 'react-router-dom'

import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function Modal(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { open, setOpen, score } = props

  const handleClose = () => {
    setOpen(false)
  }
  if ( open === false ) return null

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box sx={{
        width: '600px',
        padding: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 900px)': { 
          width: '300px'
        }
      }}>

        { score >= 75 ? (
          <Typography variant="h5" component="h2" sx={{ color: 'green' }}>
            Chúc mừng bạn đã vượt qua bài kiểm tra với số điểm là {score}
          </Typography>
        ) : (
          <Typography variant="h5" component="h2" sx={{ color: 'red' }}>
            Bạn đã không vượt qua bài kiểm tra với số điểm là {score}
          </Typography>
        ) }

        <Button onClick={ () => { navigate(`${location.pathname}/history`) } } > Xem đáp án </Button>

      </Box>
    </Dialog>
  )
}

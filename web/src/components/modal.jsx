import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

// function
import textToSpeech from '../functions/textToSpeech'


export default function Modal(props) {
  const { open, setOpen, data } = props
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false)
  }
  if ( open === false ) return null

  if (!data) return null

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

        <CloseIcon onClick={handleClose} sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer'
        }} />
        <Typography variant="h5" component="h2">
          <b>{data.word}</b>({data.part_of_speech}): {data.meaning}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap:'10px' }}>
          <VolumeUpIcon onClick={() => textToSpeech(data.word)} color='primary' sx={{ cursor: 'pointer' }} />
          <Typography variant="h5" component="p">
            {data.pronunciation}
          </Typography>
        </Box>
        <Typography variant="body1" component="p">
          {data.example}
        </Typography>
        <Typography variant="body1" component="p">
          {data.translate}
        </Typography>
      </Box>
    </Dialog>
  )
}

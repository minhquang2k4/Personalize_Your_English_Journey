import { useEffect, useState } from 'react'

import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import MicIcon from '@mui/icons-material/Mic'


export default function Similarity(props) {
  const { open, setOpen, data } = props
  const [listening, setListening] = useState(false)


  const handleClose = () => {
    setOpen(false)
    setListening(false)
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
        <CloseIcon onClick={handleClose} sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer'
        }} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '30px'
        }}>
          { listening ? ( 
            <>
              <MicIcon sx={{ color: '#ea4335', fontSize: '60px' }} onClick={() => { setListening(false) }} />
              <Typography variant='h4' component='h2' sx={{ textAlign: 'center' }}>Đang nghe ...</Typography>
            </>
          ) : (
            <>
              <MicIcon sx={{ color: '#42a5f5', fontSize: '60px' }} onClick={() => { setListening(true) }} />
              <Typography variant='h4' component='h2' sx={{ textAlign: 'center' }}>Nhấn vào biểu tượng để bắt đầu</Typography>
            </>
          )}
          { listening ? <CheckSimilarity text={data} setListening={setListening} /> : null }
        </Box>

      </Box>
    </Dialog>
  )
}

function CheckSimilarity({ text, setListening }) {
  const [text2, setText2] = useState('')
  const [similarity, setSimilarity] = useState(null)

  useEffect(() => {
    // if (!('webkitSpeechRecognition' in window)) {
    //   alert('Trình duyệt của bạn không hỗ trợ Web Speech API.')
    //   setListening(false)
    //   return
    // }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      console.log('Đang nghe...')
    }

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript
      const cleanText = removePunctuation(spokenText)
      setText2(cleanText)

      // Update similarity after updating text2
      setSimilarity(calculateSimilarity(text, cleanText))
    }

    recognition.onerror = (event) => {
      console.error('Lỗi nhận diện:', event.error)
      setListening(false)
    }

    recognition.start()

    return () => {
      recognition.stop()
    }
  }, [])

  const removePunctuation = (text) => text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]+$/, '')

  return (
    <>
      {similarity !== null && <Typography variant="h6">Độ tương đồng: {similarity.toFixed(2)}%</Typography>}
    </>
  )
}

 
function calculateSimilarity(text1, text2) {
  // Tính khoảng cách Levenshtein
  const distance = levenshteinDistance(text1.toLowerCase(), text2.toLowerCase())
  const maxLength = Math.max(text1.length, text2.length)
  // Tính độ giống nhau theo phần trăm
  return ((1 - distance / maxLength) * 100)
}

function levenshteinDistance(a, b) {
  const matrix = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0))

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }

  return matrix[a.length][b.length]
}
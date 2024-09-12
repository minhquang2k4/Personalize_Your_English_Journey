import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams, useNavigate } from 'react-router-dom'

// UI
import Loader from './loader'
// MUI
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid2'
import { Button } from '@mui/material'

export default function AddVoca(props) {
  const { open, setOpen } = props

  const API_URL = import.meta.env.VITE_API_URL
  const { id } = useParams()
  const navigate = useNavigate()

  const [word, setWord] = useState('')
  const [meaning, setMeaning] = useState('')
  const [loading, setLoading] = useState(false)


  const handleClose = () => {
    setOpen(false)
  }
  if ( open === false ) return null

  const handleAddVoca = async () => {
    if (word === '' && meaning === '') {
      alert('Vui lòng 1 trong 2 trường thông tin')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/topics/yourtopic/${id}/addVoca`, {
        word: word,
        meaning: meaning
      }, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      })
      
      if (response.status === 200) {
        setWord('')
        setMeaning('')
        setOpen(false)
        // refresh
        window.location.reload()
      }

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

    setLoading(false)

  }

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
      { loading && <Loader /> }
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

        <Typography variant="h4" align="center" gutterBottom> Thêm từ mới </Typography>
        <Grid container spacing={2} sx={{ margin: 'auto', marginTop: '10px' }} > 
          <Grid size={6}>
            <TextField id="outlined-basic" label="Từ" variant="outlined" onChange={(e) => { setWord(e.target.value) } } />
          </Grid>
          <Grid size={6}>
            <TextField id="outlined-basic" label="Nghĩa" variant="outlined" onChange={(e) => { setMeaning(e.target.value) }} />
          </Grid>
        </Grid>

        <Button variant='contained' onClick={ () => {handleAddVoca()}} sx={{
          width: '40%',
          margin: 'auto',
          marginTop: '35px'
        }}>
          Thêm từ
        </Button>
      </Box>
    </Dialog>
  )
}

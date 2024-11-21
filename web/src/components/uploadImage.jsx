'use client'

import { useState } from 'react'
import { 
  Dialog, Box, Typography, IconButton, Button, 
  TextField, LinearProgress, Fade
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function Modal({ open, setOpen }) {
  const [fileName, setFileName] = useState('')
  const [imageName, setImageName] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setFileName('')
    setImageName('')
    setUploading(false)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
      setImageName(file.name.split('.')[0])
    }
  }

  const handleUpload = () => {
    if (fileName && imageName) {
      setUploading(true)

      setTimeout(() => {
        setUploading(false)
        handleClose()
      }, 2000)
    }
  }

  if (!open) return null

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Box sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Upload Image
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ 
              height: 56,
              borderStyle: 'dashed',
              '&:hover': { borderStyle: 'dashed' }
            }}
          >
            {fileName || 'Choose a file'}
            <VisuallyHiddenInput type="file" onChange={handleFileChange} accept="image/*" />
          </Button>

          <TextField
            fullWidth
            label="Image Name"
            variant="outlined"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            disabled={!fileName}
          />

          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!fileName || !imageName || uploading}
            sx={{ 
              height: 56,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Box>

        <Fade in={uploading}>
          <LinearProgress />
        </Fade>
      </Box>
    </Dialog>
  )
}
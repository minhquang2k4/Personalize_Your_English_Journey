import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  useTheme
} from '@mui/material'
import { Language, Psychology, Book, Rocket } from '@mui/icons-material'

const HomePage = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box sx={{
      minHeight: '90vh',
      backgroundColor: theme.palette.background.default
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Language sx={{ fontSize: 60, color: theme.palette.primary.main }} />
          <Typography variant="h2" component="h1" gutterBottom>
            Personalize Your English Journey
          </Typography>
        </Box>
        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Bạn đã sẵn sàng để bắt đầu hành trình học tiếng Anh của mình?
          </Typography>
          {/* chuyển hướng đến trang /topics/newtopic */}
          <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={ () => { navigate('/topics/newtopic') }}>
            Get Started Now
          </Button>
        </Box>
        {/* Features Section */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out', 
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}>
              <CardContent>
                <Psychology sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                <Typography gutterBottom variant="h5" component="div">
                  Học Tập Dựa Trên AI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Các thuật toán AI tiên tiến của chúng tôi sẽ giúp bạn học tiếng Anh hiệu quả hơn.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out', 
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}>
              <CardContent>
                <Book sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                <Typography gutterBottom variant="h5" component="div">
                  Phương Pháp Dựa Trên Chủ Đề
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Học từ vựng theo ngữ cảnh với danh sách từ theo chủ đề cụ thể và các câu ví dụ.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease-in-out', 
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}>
              <CardContent>
                <Rocket sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
                <Typography gutterBottom variant="h5" component="div">
                  Tiến bộ nhanh chóng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Đẩy nhanh quá trình học tiếng Anh của bạn với nội dung được cá nhân hóa quan trọng đối với bạn.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomePage
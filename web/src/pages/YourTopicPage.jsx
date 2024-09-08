import { Box } from '@mui/material'
import YourTopicComponent from '../components/topicComponents/yourTopicComponent'

const YourTopicPage = () => {
  return (
    <Box sx={{
      width: '100%',
      height: '95.3%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <YourTopicComponent />
    </Box>
  )
}

export default YourTopicPage
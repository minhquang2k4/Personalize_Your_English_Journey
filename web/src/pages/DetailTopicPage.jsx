import { Box } from '@mui/material'
import DetailTopicComponent from '../components/topicComponents/detailTopicComponent'

const DetailTopicPage = () => {
  return (
    <Box sx={{
      padding: '13px',
      height: '93vh',
      backgroundColor: '#f5f5f5'
    }}>
      <DetailTopicComponent />
    </Box>
  )
}

export default DetailTopicPage
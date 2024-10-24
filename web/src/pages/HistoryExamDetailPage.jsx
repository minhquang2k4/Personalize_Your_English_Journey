import { Box } from '@mui/material'
import HistoryExamDetailComponent from '../components/topicComponents/HistoryExamDetailComponent'

const HistoryExamDetailPage = () => {
  return (
    <Box sx={{
      padding: '13px',
      height: '94vh',
      backgroundColor: '#f5f5f5'
    }}>
      <HistoryExamDetailComponent />
    </Box>
  )
}

export default HistoryExamDetailPage
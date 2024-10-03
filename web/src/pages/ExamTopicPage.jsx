import Box from '@mui/material/Box'

import ExamTopicComponent from '../components/topicComponents/examTopicComponent'

export default function ExamTopicPage() {
  return (
    <Box sx={{
      padding: '13px',
      height: '94vh',
      backgroundColor: '#f5f5f5'
    }}>
      <ExamTopicComponent />
    </Box>
  )
}
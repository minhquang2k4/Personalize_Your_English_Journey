import Box from '@mui/material/Box'

import PracticeTopicComponent from '../components/topicComponents/practiceTopicComponent'

export default function PracticeTopicPage() {
  return (
    <Box sx={{
      padding: '13px',
      height: '94vh',
      backgroundColor: '#f5f5f5'
    }}>
      <PracticeTopicComponent />
    </Box>
  )
}
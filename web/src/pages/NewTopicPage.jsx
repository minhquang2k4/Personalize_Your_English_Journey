
import Box from '@mui/material/Box'

import NewTopic from '../components/topicComponents/newTopicComponent.jsx'

const NewTopicPage = () => {
  return (
    <Box sx={{
      backgroundColor: '#f5f5f5',
      padding: '13px',
      height: '94vh'
    }}>
      <NewTopic />
    </Box>
  )
}

export default NewTopicPage

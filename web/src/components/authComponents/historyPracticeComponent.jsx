import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

// UI Components
import Loader from '../loader'

import { Box, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { set } from 'lodash'

export default function HistoryPracticeComponent() {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  
  const [value, setValue] = useState('1')
  const [pronunciationData, setPronunciationData] = useState([])
  const [questionData, setQuestionData] = useState([])
  const [loading, setLoading] = useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${API_URL}/user/historyPractice`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        setPronunciationData(response.data.historyPronunciation)
        setQuestionData(response.data.historyQuestion)
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/auth/login')
        }
        if (error.response?.status === 403) {
          alert('Sai Token, Vui lòng đăng nhập lại')
          navigate('/auth/login')
        }
        if (error.response?.status === 500) {
          alert('Lỗi sever. Vui lòng thử lại sau')
        }
      }
    }
    fetchData()
    setLoading(false)
  }, [])
  
  return (
    <Box sx={{
      backgroundColor: 'white',
      margin: 'auto',
      borderRadius: '3px',
      height: '92vh',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      {loading && <Loader />}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Phát âm" value="1" />
            <Tab label="Câu hỏi trắc nhiệm" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ height: '761px', overflowY: 'auto', p: 0 }}>
          <TableContainer component={Paper} sx={{ height: '100%', borderRadius: 0 }}>
            <Table sx={{ minWidth: 650, backgroundColor: '#FAFAFA' }} aria-label="pronunciation history table">
              <TableHead>
                <TableRow>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Từ</TableCell>
                  <TableCell>Nghĩa</TableCell>
                  <TableCell>Độ khó</TableCell>
                  <TableCell>Độ tương đồng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pronunciationData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: index % 2 === 0 ? 'white' : '#FAFAFA',
                      cursor: 'cell',
                      '&:hover': { backgroundColor: '#F5F5F5' }
                    }}
                  >
                    <TableCell component="th" scope="row">{row.time}</TableCell>
                    <TableCell align="left">
                      {row.word}
                    </TableCell>
                    <TableCell>{row.meaning}</TableCell> 
                    <TableCell>{row.difficulty}</TableCell>
                    <TableCell>{row.similarity}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="2" sx={{ height: '761px', overflowY: 'auto', p: 0 }}>
          <TableContainer component={Paper} sx={{ height: '100%', borderRadius: 0 }}>
            <Table sx={{ minWidth: 650, backgroundColor: '#FAFAFA' }} aria-label="question history table">
              <TableHead>
                <TableRow>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Từ</TableCell>
                  <TableCell>Độ khó</TableCell>
                  <TableCell>Nghĩa</TableCell>
                  <TableCell>Kết quả</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questionData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: index % 2 === 0 ? 'white' : '#FAFAFA',
                      cursor: 'cell',
                      '&:hover': { backgroundColor: '#F5F5F5' }
                    }}
                  >
                    <TableCell>{row.time}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.word}
                    </TableCell>
                    <TableCell>{row.difficulty}</TableCell>
                    <TableCell>{row.meaning}</TableCell>
                    <TableCell>{row.value ? 'Đúng' : 'Sai'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </Box>
  )
}
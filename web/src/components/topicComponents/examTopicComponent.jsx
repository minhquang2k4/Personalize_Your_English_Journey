import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'

// UI Components
import Loader from '../loader'

// MUI
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'

export default function ExamTopicComponent() {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(1000)

  const columns = [
    { id: 'id', align: 'center', label: 'ID', minWidth: 150 },
    { id: 'count', align: 'center', label: 'Số câu hỏi', minWidth: 150 },
    { id: 'times', align: 'center', label: 'Số lần làm', minWidth: 150 },
    { id: 'max', align: 'center', label: 'Điểm cao nhất', minWidth: 150 }
  ]
  
  function createData(id, questionIDs, score) {
    let times = score.length
    let count = questionIDs.length
    let max = Math.max(...score)
    return { id, count, times, max }
  }

  const handleChangePage = ( newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const createExam = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/topics/yourtopic/${id}/createExam`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
      setLoading(false)
      navigate(`/topics/yourtopic/${id}/exam/${response.data.examID}`)
    }
    catch (error) {
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
  }

  useEffect( () => {
    setLoading(true)

    const fetchExam = async () => {
      try {
        const response = await axios.get(`${API_URL}/topics/yourtopic/${id}/getAllExam`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        setRows([])
        for (let data of response.data.topic.examIDs) {
          setRows((prev) => [...prev, createData(data._id, data.questionIDs, data.score)])
        }
        setLoading(false)
  
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
    }
    fetchExam()
  }, [] )

  return (
    <Box sx={{
      backgroundColor: 'white',
      margin: 'auto',
      borderRadius: '3px',
      height: '92vh',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      { loading && <Loader /> }
      <Typography variant='h4' component='div' sx={{ textAlign: 'center', padding: '90px' }} >Đề kiểm tra</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
        <Button onClick={() => { createExam() } } >Tạo đề kiểm tra mới</Button>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'auto', boxShadow: '0px -1px 6px rgba(0, 0, 0, 0.1)' }}>
        <TableContainer sx={{ maxHeight: '600px', minHeight:'600px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const backgroundColor = index % 2 === 0 ? '#FAFAFA' : '#ffffff'
                  return (
                    <TableRow hover tabIndex={-1} key={index} sx={{
                      cursor: 'pointer', 
                      backgroundColor: { backgroundColor } 
                    }} >
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align} onClick={ () => { navigate(`/topics/yourtopic/${id}/exam/${row.id}/history`) } } >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>      
    </Box>
  )
}
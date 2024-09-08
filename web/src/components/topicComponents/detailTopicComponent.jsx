import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'

// UI Components
import Loader from '../loader'
import Steper from '../stepper'
import Modal from '../modal'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Box, Button, Typography } from '@mui/material'

export default function DetailTopicComponent() {
  const columns = [
    { id: 'word', align: 'center', label: 'Từ', minWidth: 150 },
    { id: 'part_of_speech', align: 'center', label: 'Loại từ', minWidth: 150 },
    { id: 'pronunciation', align: 'center', label: 'Phiên âm', minWidth: 150 },
    { id: 'meaning', align: 'center', label: 'Nghĩa', minWidth: 150 }
  ]
  
  function createData(id, word, part_of_speech, pronunciation, meaning, example, translate) {
    return { id, word, part_of_speech, pronunciation, meaning, example, translate }
  }

  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(1000)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  const handleChangePage = ( newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleRowClick = (row) => {
    setSelectedRow(row)
    setOpen(true)
  }

  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/topics/yourtopic/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        setStep(response.data.topic.step)
        setRows([])
        for (let voca of response.data.topic.vocabularyIDs) {
          setRows((prev) => [...prev, createData(voca._id, voca.word, voca.part_of_speech, voca.pronunciation, voca.meaning, voca.example, voca.translate)])
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
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Box sx={{
      backgroundColor: 'white',
      margin: 'auto',
      borderRadius: '3px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <Box sx={{
        paddingTop: '60px',
        paddingBottom: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          <b>Chi tiết chủ đề</b>
        </Typography>
        <Steper step={step}/>
      </Box>

      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '10px',
        marginTop: '-18px'
      }}>
        <Button onClick={() => navigate(`/topics/yourtopic/${id}/practice`)}>
          Luyện tập
        </Button>
        <Button onClick={() => navigate(`/topics/yourtopic/${id}/exam`)}>
          Kiểm tra
        </Button>
      </Box>
      <Modal open={open} setOpen={setOpen} data={selectedRow} />
      <Paper sx={{ width: '100%', overflow: 'auto', boxShadow: '0px -1px 6px rgba(0, 0, 0, 0.1)' }}>
        {loading && <Loader />}
        <TableContainer sx={{ maxHeight: '460px', minHeight:'460px' }}>
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
                    <TableRow hover tabIndex={-1} key={index} onClick={() => handleRowClick(row)} sx={{
                      cursor: 'pointer', 
                      backgroundColor: { backgroundColor } 
                    }} >
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell key={column.id} align={column.align}>
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
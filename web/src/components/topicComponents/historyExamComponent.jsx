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

export default function HistoryExamPage() {
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const { id, examID } = useParams()
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(1000)

  const columns = [
    { id: 'lan', align: 'center', label: 'Lần', minWidth: 150 },
    { id: 'diem', align: 'center', label: 'Điểm', minWidth: 150 }
  ]
  
  function createData(count, score) {
    let lan = count
    let diem = score
    return { lan, diem }
  }

  const handleChangePage = ( newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const executeExam = () => {
    navigate(`/topics/yourtopic/${id}/exam/${examID}`)
  }

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/topics/yourtopic/${id}/${examID}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        setRows([])
     
        console.log("🚀 ~ fetchData ~ response.data.exam.score.length:", response.data.exam.score.length)
        for (let i = 0; i < response.data.exam.score.length; i++) {
          let data = createData( i+1, response.data.exam.score[i])
          setRows((prev) => [...prev, data])
        }

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
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
      <Typography variant='h4' component='div' sx={{ textAlign: 'center', padding: '90px' }} >Lịch sử làm bài</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
        <Button onClick={() => { executeExam() } } >Làm bài</Button>
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
                          <TableCell key={column.id} align={column.align} onClick={ () => { navigate(`/topics/yourtopic/${id}/exam/${examID}/history/${row['lan']}`) } } >
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
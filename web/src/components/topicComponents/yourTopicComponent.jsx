import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Loader from '../loader'

export default function YourTopicComponent() {
  const columns = [
    { id: 'name', align: 'center', label: 'Tên chủ đề', minWidth: 250 },
    { id: 'vocabulary', align: 'center', label: 'Số lượng từ', minWidth: 150, format: (value) => value.toLocaleString('en-US') },
    // { id: 'point', align: 'center', label: 'Điểm cao nhất', minWidth: 150, format: (value) => value.toFixed(2) },
    { id: 'step', align: 'center', label: 'Trạng thái', minWidth: 170 }
  ]
  
  function createData(id, name, vocabulary, step) {
    return { id, name, vocabulary, step }
  }

  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(1000)
  const [loading, setLoading] = useState(true)

  const handleChangePage = ( newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleRowClick = (id) => {
    navigate(`/topics/yourtopic/${id}`)
  }

  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const isLogin = JSON.parse(localStorage.getItem('islogin'))

  useEffect( () => {
    if (!isLogin) {
      alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục')
      navigate('/auth/login')
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/topics`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        })
        setRows([])
        response.data.topics.forEach((topic) => {
          let step 
          switch (topic.step) {
          case 1:
            step = 'Luyện từ vựng'
            break
          case 2:
            step = 'Luyện hội thoại'
            break
          case 3:
            step = 'Hoàn thành'
            break
          default:
            step = 'Luyện từ vựng'
            break
          }
          setRows((rows) => [...rows, createData(topic._id, topic.topicName, topic.vocabularyIDs.length, step)])
        })
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
  }, [isLogin])


  return (
    <Paper sx={{ width: '98%', overflow: 'auto', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
      {loading && <Loader />}
      <TableContainer sx={{ maxHeight: '760px', minHeight:'760px' }}>
        <Table stickyHeader aria-label="sticky table">
          {/* <TableHead sx={{ '& .MuiTableHead-root': {
            backgroundColor: '#FAFAFA'
          } }}> */}
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
                  <TableRow hover tabIndex={-1} key={index} onClick={() => handleRowClick(row.id)} sx={{
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
  )
}
import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState, setParams } from 'react'
import { Stack, Pagination, TextField } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
export default function ShowAllProduct() {
  const [PageNumber, setPageNumber] = useState(1)
  const [PageSize, setPageSize] = useState(10)
  const [OrderByDesc, setOrderByDesc] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [TotalPage, setTotalPage] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const params = {
    queryDTO: {
      PageNumber: PageNumber,
      PageSize: PageSize,
      ...(OrderByDesc !== null && { OrderByDesc: OrderByDesc }),
    },
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  useEffect(() => {
    // Define the Read function inside useEffect or make sure it's defined outside and doesn't change
    function Read() {
      const url = 'https://localhost:7122/api/WarrantyDocument';
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*'
        },
      })
        .then(response => response.json())
        .then(responseData => {
          setData(responseData) // Access the array using the key
        })
        .catch((error) => console.error('Error:', error))
    }
    Read()
  }, [triggerRead])



  return (
    <div style={{
      justifyContent: 'flex-end'
    }}>

      <Container sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Period</TableCell>
                  <TableCell>Terms and conditions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                        <TableCell>{item.period}</TableCell>
                        <TableCell>{item.termsAndConditions}</TableCell>
                      </TableRow>
                    </>
                  ))
                }
              </TableBody>

            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Stack sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={Array.isArray(data) && (data.length)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        />
      </Stack>
    </div >
  )
}
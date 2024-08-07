import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableContainer,
  TableHead, TableCell, TableRow, TablePagination,
  Stack, Box
} from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import CreateCertificate from './CreateCertificate'
import UpdateCertificate from './UpdateCertificate'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
export default function Certificate() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const pageNumber = searchParams.get('pageNumber') - 1 || 0
  const [dataCertificate, setDataCertificate] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const [page, setPage] = useState(pageNumber)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    navigate(`/admin/certificate?pageNumber=${newPage + 1}`)
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing the number of rows per page
  };

  useEffect(() => {
    const url = createApi('Certificate/GetAllCertificates')
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(response => response.json())
      .then(responseData => {
        setDataCertificate(responseData)
      })
      .catch((error) => console.error('Error:', error))
  }, [triggerRead])

  const rowHeader = ['Report Number', 'Origin', 'Date Of Issue (mm/dd/yyyy)', 'Action']
  return (
    <div className='contentAdminContainer'>
      <div className='CRUDContainer '>
        <div className='titleOfFormContainer'>
          <h2>Certificate</h2>
        </div>
        {dataCertificate ? (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '10vw',
            }}>
              <CreateCertificate onCertificateCreated={() => setTriggerRead(prev => !prev)}></CreateCertificate>
            </div>
            <div className='buttonContainer'>
              <Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {rowHeader.map((item, index) => (
                          <TableCell key={index} sx={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                          }}>{item}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataCertificate &&
                        dataCertificate
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.reportNumber}</TableCell>
                              <TableCell>{item.origin}</TableCell>
                              <TableCell>{new Date(item.dateOfIssue).toLocaleDateString()}</TableCell>
                              <TableCell><UpdateCertificate data={item} onCertificateUpdated={() => setTriggerRead(prev => !prev)}></UpdateCertificate></TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Stack sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TablePagination
                  rowsPerPageOptions={[10, 20]}
                  component="div"
                  count={Array.isArray(dataCertificate) && (dataCertificate.length)}
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
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '100%',
          }}>
            <CircularProgress />
          </div>
        )}

      </div>
    </div>
  )
}

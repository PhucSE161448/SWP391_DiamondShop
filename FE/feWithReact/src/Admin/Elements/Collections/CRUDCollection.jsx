import React, { useState, useEffect } from 'react'
import CreateCollection from './CreateCollection'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, CircularProgress } from '@mui/material'
import ButtonDeleteCollections from './ButtonDeleteCollections'
import UpdateCollection from './UpdateCollection'
import { createApi } from '../../../Auth/AuthFunction'
import { useNavigate, useSearchParams } from 'react-router-dom'
export default function CRUDCollections() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [page, setPage] = useState(searchParams.get('pageNumber') - 1 || 0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [triggerRead, setTriggerRead] = useState(false);

  const handleChangePage = (event, newPage) => {
    navigate(`/admin/collections?pageNumber=${newPage + 1}`)
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  useEffect(() => {
    // Define the Read function inside useEffect or make sure it's defined outside and doesn't change
    function Read() {
      const url = createApi('Collection/GetAllCollections')
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
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

  const tableHead = ['Name', 'Status',]
  return (
    <>
      {data ? (
        <div className='formCRUDContainer'>
          <div>
            <><CreateCollection onCollectionCreated={() => setTriggerRead(prev => !prev)} /></>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHead.map((head, index) => (
                    <TableCell key={index} sx={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}>{head}</TableCell>
                  ))}
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '20px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  Array.isArray(data) && data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, index) => (
                      <TableRow key={data.id}>
                        <TableCell style={{
                          maxWidth: '11vw',
                          minWidth: '11vw'
                        }}>
                          {data.name}
                        </TableCell>
                        <TableCell style={{
                          maxWidth: '11vw',
                          minWidth: '11vw'
                        }}>
                          <ButtonDeleteCollections id={data.id} isDeleted={data.isDeleted} />
                        </TableCell>
                        <TableCell>
                          <UpdateCollection id={data.id} name={data.name} onCollectionUpdated={() => setTriggerRead(prev => !prev)}></UpdateCollection>
                        </TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
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
        </div >
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
    </>
  )
}
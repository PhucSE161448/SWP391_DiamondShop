import React, { useState, useEffect } from 'react'
import CreateCollection from './CreateCollection'
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import ButtonDeleteCollections from './ButtonDeleteCollections'
import UpdateCollection from './UpdateCollection'
import { createApi } from '../../../Auth/AuthFunction'
export default function CRUDCollections() {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(9)
  const [triggerRead, setTriggerRead] = useState(false);

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

  const tableHead = ['#', 'Name', 'Status',]
  return (
    <>
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
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
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
          rowsPerPageOptions={[9]}
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
    </>
  )
}
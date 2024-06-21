import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import CancelIcon from '@mui/icons-material/Cancel'
import CreateDiamond from './CreateDiamond';

export default function ReadDiamond() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const columns = [
        { id: '#', label: '#', align: 'left' },
        { id: 'origin', label: 'Origin', align: 'left' },
        { id: 'color', label: 'Color', align: 'left' },
        { id: 'caratWeight', label: 'Carat Weight', align: 'left' },
        { id: 'clarity', label: 'Clarity', align: 'left' },
        { id: 'cut', label: 'Cut', align: 'left' },
        { id: 'Name', label: 'Name', align: 'left' },
        { id: 'price', label: 'Price', align: 'left' },
        { id: 'quantity', label: 'Quantity', align: 'left' },
    ];

    useEffect(() => {
        function fetchData() {
            const url = 'https://localhost:7122/api/Diamond/GetPagedDiamonds?QueryDTO.PageNumber=1&QueryDTO.PageSize=50';
            fetch(url)
                .then(response => response.json())
                .then(responseData => {
                    setData(responseData.items)
                    console.log(data)
                })
                .catch(error => console.error('Error fetching data:', error));
        }
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell><CreateDiamond onDiamondCreated={() => setTriggerRead(prev => !prev)}></CreateDiamond></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'Name' ? row.Name : row[column.id]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

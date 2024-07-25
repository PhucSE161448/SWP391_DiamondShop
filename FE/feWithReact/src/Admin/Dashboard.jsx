import React, { useEffect, useState } from 'react'
import { createApi } from '../Auth/AuthFunction'
import { BarChart } from '@mui/x-charts/BarChart'
import { FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import DiamondIcon from '@mui/icons-material/Diamond'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
export default function Dashboard() {
  const [dataDashboard, setDataDashboard] = useState([])
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [dataDashboardStats, setDataDashboardStats] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const navigate = useNavigate()
  const years = Array.from({ length: 2034 - 2024 + 1 }, (_, index) => 2024 + index)
  const role = localStorage.getItem('role')
  if (role === '3' || role === '4') {
    navigate('/admin/order')
  }
  if (role === '2') {
    navigate('/admin/product')
  }
  useEffect(() => {
    function getDataDashboard() {
      for (let month = 1; month <= 12; month++) {
        // Assuming the API expects the month in MM format (01, 02, ..., 12)
        const formattedMonth = month.toString().padStart(2, '0')
        const url = createApi(`Dashboard/GetOrderStatistic/${formattedMonth}/${year}`)

        fetch(url)
          .then(response => response.json())
          .then(data => {
            setDataDashboard(prevData => {
              const newDataIndex = prevData.findIndex(item => item.month === formattedMonth)
              if (newDataIndex === -1) {
                // Month not found, add new data
                return [...prevData, { month: formattedMonth, data }]
              } else {
                // Month found, optionally update the data for that month
                return prevData.map((item, index) =>
                  index === newDataIndex ? { ...item, data: { ...item.data, ...data } } : item
                )
              }
            })
          })
      }
    }
    getDataDashboard()
  }, [year])

  useEffect(() => {
    const url = createApi(`Dashboard/GetDashboardStats`)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setDataDashboardStats(data)
      })
  }, [triggerRead])

  dataDashboard.sort((a, b) => a.month.localeCompare(b.month))
  const valueFormatterPrice = (value) => `$${value.toLocaleString()}`

  const styleBox = {
    padding: '1rem',
    borderRadius: '5px',
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div className='contentAdminContainer'>
      <div className='CRUDContainer '>
        {dataDashboardStats && dataDashboard.length === 12 ? (
          <>
            <div className='titleOfFormContainer'>
              <h2>Dashboard</h2>
            </div>
            {dataDashboardStats && (
              <div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  gap: '1rem',
                }}>
                  <Box sx={{
                    ...styleBox,
                    backgroundColor: 'lightgreen',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
                    }
                  }} onClick={() => navigate('/admin/product?pageNumber=1&name=&OrderBy=false')}>
                    <Inventory2Icon sx={{
                      fontSize: '50px',
                      margin: '0.5rem'
                    }} />
                    <h4>Product </h4>
                    <h4>{dataDashboardStats.numberOfProducts}</h4>
                  </Box>
                  <Box sx={{
                    ...styleBox,
                    backgroundColor: 'lightblue',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
                    }
                  }} onClick={() => navigate('/admin/diamond?pageNumber=1&name=&OrderBy=false')}>
                    <DiamondIcon sx={{
                      fontSize: '50px',
                      margin: '0.5rem'
                    }} />
                    <h4>Diamond</h4>
                    <h4>{dataDashboardStats.numberOfDiamonds}</h4>
                  </Box>
                  <Box sx={{
                    ...styleBox,
                    backgroundColor: 'lightcoral',
                  }}>
                    <AttachMoneyIcon sx={{
                      fontSize: '50px',
                      margin: '0.5rem'
                    }} />
                    <h4>Revenue</h4>
                    <h4>${dataDashboardStats.totalRevenue?.toLocaleString()}</h4>
                  </Box>
                  <Box sx={{
                    ...styleBox,
                    backgroundColor: 'lightgray',
                  }}>
                    <LocalAtmIcon sx={{
                      fontSize: '50px',
                      margin: '0.5rem'
                    }} />
                    <h4>Profit</h4>
                    <h4>$
                      {Number(dataDashboardStats.profit).
                        toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                  </Box>
                </div>
              </div>
            )}
            <br />
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <div style={{
                  width: '15%',
                }}>
                  <FormControl fullWidth>
                    <InputLabel>Select Year</InputLabel>
                    <Select
                      id="yearSelect"
                      label="Select Year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      {years.map((year) => (
                        <MenuItem key={year} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                {dataDashboard.length === 12 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <BarChart
                        yAxis={[{
                          label: 'Total Orders Finished',
                          valueFormatter: (value) => `${value}`,
                        }]}
                        xAxis={[{ label: 'Month', scaleType: 'band', data: dataDashboard.map(item => item.month) }]}
                        series={[{ data: dataDashboard.map(item => item.data.totalOrders), valueFormatter: (value) => `${value} order(s)` }]}
                        width={500}
                        height={300}
                      />
                      <h4>Total Orders Finished</h4>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <BarChart
                        yAxis={[{
                          valueFormatter: valueFormatterPrice,
                        }]}
                        xAxis={[{ label: 'Month', scaleType: 'band', data: dataDashboard.map(item => item.month) }]}
                        series={[{ data: dataDashboard.map(item => item.data.totalRevenue), valueFormatter: valueFormatterPrice }]}
                        width={500}
                        height={300}
                      />
                      <h4>
                        Total Revenue
                      </h4>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <BarChart
                        yAxis={[{ valueFormatter: valueFormatterPrice }]}
                        xAxis={[{ label: 'Month', scaleType: 'band', data: dataDashboard.map(item => item.month) }]}
                        series={[{ data: dataDashboard.map(item => item.data.averageOrderValue), valueFormatter: valueFormatterPrice }]}
                        width={500}
                        height={300}
                      />
                      <h4>
                        Average Order Value
                      </h4>
                    </div>
                  </div>

                )}
              </div>
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
        )
        }
      </div>
    </div>
  )
}

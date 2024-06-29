import { Box, Grid, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'
import {
  Stack, Pagination, CardMedia, FormControl, InputLabel,
  Select, MenuItem, OutlinedInput, Checkbox, ListItemText
} from '@mui/material'
import { useLocation } from 'react-router-dom';
import { Typography, Slider } from '@mui/material'
import { Link, useParams, useNavigate } from 'react-router-dom'
export default function GetPageDiamond() {
  const { PageNumberFromURL } = useParams()
  const [PageNumber, setPageNumber] = useState(PageNumberFromURL && parseInt(PageNumberFromURL))
  const [PageSize, setPageSize] = useState(12)
  const [OrderByDesc, setOrderByDesc] = useState(false)
  const [StartPrice, setStartPrice] = useState(null)
  const [EndPrice, setEndPrice] = useState(null)
  const [Price, setPrice] = useState(null)
  const [TotalPage, setTotalPage] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const dataColors = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const [valueColor, setValueColor] = useState([0, 3]); // Mặc định từ "A" đến "D"
  const navigate = useNavigate();
  // Hàm xử lý khi slider thay đổi
  const handleChange = (event, newValue) => {
    setValueColor(newValue);
    setTriggerRead(prev => !prev)
  };

  const selectedColor = dataColors.slice(valueColor[0], valueColor[1] + 1);

  const params = {
    queryDTO: {
      PageNumber: PageNumber,
      PageSize: PageSize,
      ...(StartPrice != null && { StartPrice: StartPrice }),
      ...(EndPrice != null && { EndPrice: EndPrice }),
      ...(OrderByDesc !== null && { OrderByDesc: OrderByDesc }),
      ...(selectedColor !== null && { Colors: selectedColor }),
    },
  }

  const handlePageChange = (event, value) => {
    navigate(`/diamondPage/${value}`);
    setPageNumber(value)

    setTriggerRead(prev => !prev)
  }

  const ITEM_HEIGHT = 120
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  }

  useEffect(() => {
    function ReadData() {
      let queryString = new URLSearchParams()
      Object.entries(params.queryDTO).forEach(([key, value]) => {
        if (key === 'Colors' && Array.isArray(value)) { // Check if value is an array
          value.forEach((id) => { // Iterate over the array
            queryString.append(`${key}`, id);
          })
        } else if ((key === 'StartPrice' || key === 'EndPrice') && !Array.isArray(value)) {
          queryString.append(`${key}`, value);
        } else {
          queryString.append(`queryDTO.${key}`, value);
        }
      });

      fetch(`https://localhost:7122/api/Diamond/GetPagedDiamonds?${queryString.toString()}`)
        .then(response => response.json())
        .then(data => {
          setData(data.items)
          setTotalPage(Math.ceil(data.totalItemsCount / PageSize))
        })
        .catch(error => {
          // Xử lý lỗi ở đây
          console.error(error)
        })
    }
    window.addEventListener('popstate', ReadData)
    ReadData()
    return () => window.removeEventListener('popstate', ReadData)
  }, [triggerRead])

  const handleChangePageSize = (value) => {
    setPageSize(value)
    setTriggerRead(prev => !prev)
  }

  const handleChangeOrder = (value) => {
    setOrderByDesc(value)
    setTriggerRead(prev => !prev)
  }


  const handleSelectPrice = (value) => {
    if (value === null) {
      setStartPrice(null)
      setEndPrice(null)
    } else {
      const [start, end] = value.split('-')
      setStartPrice(start)
      setEndPrice(end)
    }
    setPrice(value)
    setTriggerRead(prev => !prev)
  }

  return (
    <div style={{
      background: 'url(https://img.freepik.com/free-vector/blue-white-crystal-textured-background_53876-85226.jpg?w=1380&t=st=1719599020~exp=1719599620~hmac=e182c45295cca98949de853e8f72341b687ed809b89663e38e1d78cbaec7314c)',
      backgroundSize: 'cover',
    }}>
      <div className='row' style={{
        display: 'flex',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '20px',
      }}>
        <div className='col-1'>
          <FormControl fullWidth>
            <InputLabel>Diamonds per page</InputLabel>
            <Select
              label="Diamonds per page"
              MenuProps={MenuProps}
              value={PageSize}
              onChange={(e) => handleChangePageSize(e.target.value)}
            >
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={32}>32</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='col-1'>
          <FormControl fullWidth>
            <InputLabel>
              Order by price
            </InputLabel>
            <Select
              label="Order by price"
              MenuProps={MenuProps}
              value={OrderByDesc}
              onChange={(e) => handleChangeOrder(e.target.value)}
            >
              <MenuItem value={false}>Ascending</MenuItem>
              <MenuItem value={true}>Descending</MenuItem>
              <MenuItem value={null}>Default</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='col-2'>
          {/* <FormControl fullWidth>
            <InputLabel>Colors</InputLabel>
            <Select
              label="Colors"
              MenuProps={MenuProps}
              multiple
              value={colors}
              onChange={(e) => handleChangeColor(e.target.value)}
              input={<OutlinedInput label="Colors" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {dataColors && dataColors.map((color, index) => (
                <MenuItem key={index} value={color}>
                  <Checkbox checked={colors.includes(color)} />
                  <ListItemText primary={color} />
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Box width={300}>
            <Slider
              min={0}
              max={dataColors.length - 1}
              value={valueColor}
              onChange={handleChange}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              getAriaValueText={(value) => dataColors[value]}
              valueLabelFormat={(value) => dataColors[value]}
              step={1}
              marks
            />
          </Box>
        </div>
        <div className='col-2'>
          <FormControl fullWidth>
            <InputLabel>
              Order by price range
            </InputLabel>
            <Select
              label="Order by price range"
              MenuProps={MenuProps}
              value={Price}
              onChange={(e) => handleSelectPrice(e.target.value)}
            >
              {
                Array.from({ length: (100000 - 1000) / 15000 }, (_, index) => {
                  const start = 1000 + (15000 * index);
                  const end = start + 15000;
                  return (
                    <MenuItem key={index} value={`${start}-${end}`}>
                      ${start.toLocaleString()} - ${end.toLocaleString()}
                    </MenuItem>
                  );
                })
              }
              <MenuItem value={null}>Default</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Box sx={{
        }}>
          <Grid container columnSpacing={9} rowSpacing={6} sx={{ width: '80vw' }} columns={{ xs: 12, sm: 8, md: 12 }}>
            {data && data.map((item, index) =>
              item.isDeleted ? null : (
                <Grid item xs={12} sm={4} md={3} key={index} sx={{
                  width: '15vw',
                }} >
                  <Link
                    to={`/diamond/detail/${item.id}`}
                  >
                    <Card>
                      <CardContent>
                        {item.images && item.images[0] && item.images[0].urlPath ? (
                          <>
                            <CardMedia
                              component="img"
                              image={item.images[0].urlPath}
                              alt="Paella dish"
                              sx={{
                                width: '100%',
                              }}
                            />
                          </>

                        ) : null}
                        <p style={{
                          textAlign: 'center',
                          fontSize: '1vw',
                        }}>
                          {item.name}
                        </p>
                        {/* <p
                          style={{
                            textAlign: 'center',
                            fontSize: '1vw',
                          }}>
                          Price: {item.DiamondSizes[0]?.price.toLocaleString()}$
                        </p> */}
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Container><br />
      <Stack sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} size="large" />
      </Stack>
    </div>
  )
}
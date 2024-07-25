
import React, { useEffect, useState } from 'react'
import { Stack, Pagination, } from '@mui/material'
import {
  Table, TableBody, TableContainer, TableHead,
  ImageList, TableRow, ImageListItem,
  CircularProgress, Container, Grid,
  FormControl, InputLabel, Select, MenuItem, OutlinedInput,
  Checkbox, ListItemText, TextField
} from '@mui/material'
import TableCell from '@mui/material/TableCell';
import ButtonDeleteProduct from './ButtonDeleteProduct'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ShowDetails from './ShowDetails'
import CreateProduct from './CreateProduct'
import "swiffy-slider/css"
import UpdateProduct from './UpdateProduct';
import { createApi } from '../../../Auth/AuthFunction'
export default function ShowAllProduct() {
  const [searchParams] = useSearchParams()
  const [PageNumber, setPageNumber] = useState(searchParams.get('pageNumber'))
  const [PageSize, setPageSize] = useState(4)
  const [OrderBy, setOrderBy] = useState({ OrderByDesc: searchParams.get('OrderBy'), SortBy: '' })
  const [StartPrice, setStartPrice] = useState(null)
  const [EndPrice, setEndPrice] = useState(null)
  const [Price, setPrice] = useState(null)
  const [CategoryIds, setCategoryIds] = useState([])
  const [Category, setCategory] = useState(null)
  const [CollectionIds, setCollectionId] = useState([])
  const [dataCollection, setDataCollection] = useState(null)
  const [DiamondIds, setDiamondId] = useState([])
  const [dataDiamond, setDataDiamond] = useState(null)
  const [nameProduct, setNameProduct] = useState(searchParams.get('name') === 'None' ? null : searchParams.get('name'))
  const [TotalPage, setTotalPage] = useState(null)
  const [data, setData] = useState(null)
  const [triggerRead, setTriggerRead] = useState(false)
  const navigate = useNavigate()
  const role = localStorage.getItem('role')

  useEffect(() => {
    if (role !== '1' && role !== '2') {
      navigate('/admin')
    }
  })

  const params = {
    queryDTO: {
      PageNumber: PageNumber,
      PageSize: PageSize,
      ...(StartPrice != null && { StartPrice: StartPrice }),
      ...(EndPrice != null && { EndPrice: EndPrice }),
      ...(OrderBy.OrderByDesc !== null && { OrderByDesc: OrderBy.OrderByDesc }),
      ...(OrderBy.SortBy !== '' && { SortBy: OrderBy.SortBy }),
      ...(CategoryIds !== null && { CategoryIds: CategoryIds }),
      ...(CollectionIds !== null && { CollectionIds: CollectionIds }),
      ...(DiamondIds !== null && { DiamondIds: DiamondIds }),
      ...(nameProduct !== null && { Name: nameProduct }),
    },
  }

  const handleChangeOrder = (value, type) => {
    setData(null)
    navigate(`/admin/product?pageNumber=1&name=${nameProduct}&OrderBy=${value}`)
    if (value === null) {
      setOrderBy({ OrderByDesc: null, SortBy: '' })
    } else {
      setOrderBy({ OrderByDesc: value, SortBy: type })
      setTriggerRead(prev => !prev)
    }
  }

  const handlePageChange = (event, value) => {
    navigate(`/admin/product?pageNumber=${value}&name=${nameProduct}&OrderBy=${OrderBy.OrderByDesc}`)
    setPageNumber(value)
    setData(null)
    setTriggerRead(prev => !prev)
  }

  const handleChangeCategory = (value) => {
    setCategoryIds(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setTriggerRead(prev => !prev)
  }

  const handleChangeCollection = (value) => {
    setCollectionId(
      typeof value === 'string' ? value.split(',') : value,
    )
    setTriggerRead(prev => !prev)
  }

  const handleChangeDiamondId = (value) => {
    setDiamondId(
      typeof value === 'string' ? value.split(',') : value,
    )
    setTriggerRead(prev => !prev)
  }

  const handleChangeNameProduct = (value) => {
    setData(null)
    navigate(`/admin/product?pageNumber=1&name=${value}&OrderBy=${OrderBy.OrderByDesc}`)
    setNameProduct(value)
    setTriggerRead(prev => !prev)
  }

  const debounce = (func, delay) => {
    let debounceTimer
    return function () {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
  }

  const debouncedHandleChangeNameProduct = debounce(handleChangeNameProduct, 500)

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
    // Define the Read function inside useEffect or make sure it's defined outside and doesn't change
    function Read() {
      const url = createApi('Category/GetAllCategories')
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': '*/*'
        },
      })
        .then(response => response.json())
        .then(responseData => {
          setCategory(responseData)
        })
        .catch((error) => console.error('Error:', error))
    }
    Read()
  }, [])

  useEffect(() => {
    const url = createApi('Diamond/GetPagedDiamonds?QueryDTO.PageSize=10000')
    function getDiamondData() {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDataDiamond(data.items)
        })
        .catch(error => {
          console.error(error)
        })
    }
    getDiamondData()
  }, [])

  useEffect(() => {
    const url = createApi('Collection/GetAllCollections')
    function getCollectionData() {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDataCollection(data)
        })
        .catch(error => {
          console.error(error)
        })
    }
    getCollectionData()
  }, [])

  useEffect(() => {
    function ReadData() {
      let queryString = new URLSearchParams();
      Object.entries(params.queryDTO).forEach(([key, value]) => {
        if (key === 'CategoryIds' && Array.isArray(value)) { // Check if value is an array
          value.forEach((id) => { // Iterate over the array
            queryString.append(`${key}`, id);
          })
        } else if (key === 'CollectionIds' && Array.isArray(value)) {
          value.forEach((id) => {
            queryString.append(`${key}`, id);
          })
        } else if (key === 'DiamondIds' && Array.isArray(value)) {
          value.forEach((id) => {
            queryString.append(`${key}`, id);
          })
        } else if ((key === 'StartPrice' || key === 'EndPrice') && !Array.isArray(value)) {
          queryString.append(`${key}`, value);
        } else if ((key === 'Name') && !Array.isArray(value)) {
          queryString.append(`${key}`, value);
        } else {
          queryString.append(`queryDTO.${key}`, value);
        }
      })
      const url = createApi(`Product/GetPagedProducts?${queryString.toString()}`)
      fetch(url)
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
    ReadData()
  }, [triggerRead])

  const tableHead = ['Image', 'Name', 'Status']
  return (
    <>
      <div className='contentAdminContainer'>
        <div className='CRUDContainer'>
          <div className='titleOfFormContainer'>
            <h2>Product</h2>
          </div>
          <Container>
            <Grid container spacing={2} sx={{
              padding: '20px',
              margin: '0px',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>
                    Order by price
                  </InputLabel>
                  <Select
                    label="Order by price"
                    MenuProps={MenuProps}
                    value={OrderBy.OrderByDesc}
                    onChange={(e) => handleChangeOrder(e.target.value, 'price')}
                  >
                    <MenuItem value={false}>Ascending</MenuItem>
                    <MenuItem value={true}>Descending</MenuItem>
                    <MenuItem value={null}>Default</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>
                    Category
                  </InputLabel>
                  <Select
                    label="Category"
                    MenuProps={MenuProps}
                    multiple
                    value={CategoryIds}
                    onChange={(e) => handleChangeCategory(e.target.value)}
                    input={<OutlinedInput label="Category" />}
                    renderValue={(selected) =>
                      Category.filter(cat => selected.includes(cat.id)).map(cat => cat.name).join(', ')
                    }
                  >
                    {Category && Category.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        <Checkbox checked={CategoryIds.indexOf(item.id) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>
                    Collection
                  </InputLabel>
                  <Select
                    label="Collection"
                    MenuProps={MenuProps}
                    multiple
                    value={CollectionIds}
                    onChange={(e) => handleChangeCollection(e.target.value)}
                    input={<OutlinedInput label="Collection" />}
                    renderValue={(selected) =>
                      dataCollection.filter(cat => selected.includes(cat.id)).map(cat => cat.name).join(', ')
                    }
                  >
                    {dataCollection && dataCollection.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        <Checkbox checked={CollectionIds.indexOf(item.id) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>
                    Diamond
                  </InputLabel>
                  <Select
                    label="Diamond"
                    MenuProps={MenuProps}
                    multiple
                    value={DiamondIds}
                    onChange={(e) => handleChangeDiamondId(e.target.value)}
                    input={<OutlinedInput label="Diamond" />}
                    renderValue={(selected) =>
                      dataDiamond.filter(cat => selected.includes(cat.id)).map(cat => cat.name).join(', ')
                    }
                  >
                    {dataDiamond && dataDiamond.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        <Checkbox checked={DiamondIds.indexOf(item.id) > -1} />
                        <ListItemText primary={item.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
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
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <TextField
                    label="Search"
                    variant="outlined"
                    onChange={(e) => debouncedHandleChangeNameProduct(e.target.value)}
                    sx={{
                      width: '100%',
                    }}
                  >
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      {data ? (
        <div className='contentAdminContainer'>
          <div className='CRUDContainer'>
            <div className='buttonContainer'>
              <div className='formCRUDContainer'>
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}>
                  <CreateProduct onProductCreated={() => setTriggerRead(prev => !prev)}></CreateProduct>
                </div>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {tableHead.map((item, index) => (
                          <TableCell key={index} sx={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                          }}>{item}</TableCell>
                        ))}
                        <TableCell sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '20px',
                        }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data && data.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <ImageList sx={{ width: 200, height: 150 }} cols={1} rowHeight={150}>
                              {item.images && item.images.map((image, index) => (
                                <ImageListItem >
                                  <img key={index} src={image.urlPath} alt="img" style={{
                                    width: '150px',
                                    padding: '10px',
                                    borderRadius: '10px',
                                  }} />
                                </ImageListItem>

                              ))}
                            </ImageList>
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell key={`delete-${item.id}`}>
                            <ButtonDeleteProduct key={item.id} id={item.id} isDeleted={item.isDeleted} />
                          </TableCell>
                          <TableCell>
                            <UpdateProduct item={item} image={item.images} onProductUpdated={() => setTriggerRead(prev => !prev)}></UpdateProduct>
                            <ShowDetails id={item.id}></ShowDetails>
                          </TableCell>
                        </TableRow>

                      ))}
                    </TableBody>

                  </Table>
                </TableContainer>
                <Stack sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Pagination count={TotalPage} page={PageNumber} onChange={handlePageChange} />
                </Stack>
              </div>
            </div>
          </div>
        </div>
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
    </ >
  )
}
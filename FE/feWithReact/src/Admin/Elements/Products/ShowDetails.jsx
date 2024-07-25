import React, { useState, useEffect } from 'react'
import { Button, Box, Modal, Container } from '@mui/material'
import { createApi } from '../../../Auth/AuthFunction'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function ShowDetails(props) {
  const [open, setOpen] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const handleOpen = () => {
    setOpen(true)
    GetProductDetails(props.id)
  }
  const handleClose = () => {
    setOpen(false)

  }
  useEffect(() => {
    if (open) {
      GetProductDetails(props.id);
    }
  }, [open, props.id])
  function GetProductDetails(id) {
    const url = createApi(`Product/GetProductDetailById/${id}`)
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProductDetails(data)
      })
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Button type="button" size="large" onClick={handleOpen}>
        <MoreHorizIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            bgcolor: 'background.paper',
            border: '1px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }} >
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <h2>Product Details</h2>
            </div>
            <div className="row">
              <div className='col-6'>
                <p>Name: {productDetails?.name}</p>
                <p>Gender: {productDetails?.gender ? 'Male' : 'Female'}</p>
                <p>Category: {productDetails?.category.name}</p>
                {productDetails?.productParts?.length > 0 ? (
                  productDetails.productParts.map(part => (
                    <div key={part.id}>
                      {part.isMain ?
                        <p>Main diamond: {part.diamond.name}</p> :
                        <p>Extra diamond: {part.diamond.name}</p>}
                    </div>
                  ))
                ) : (
                  <p>No parts available.</p>
                )}
              </div>
              <div className='col-6'>
                {productDetails?.productSizes?.length > 0 ? (
                  productDetails.productSizes.map(size => (
                    <p key={size.id}>Size: {size.size}, Price: ${size.price}, Quantity: {size.quantity}</p>
                  ))
                ) : (
                  <p>No sizes available.</p>
                )}
              </div>
              <div>
                {productDetails?.images?.length > 0 ? (
                  productDetails.images.map(image => (
                    <div
                      style={{
                        display: 'inline-block',
                        margin: '10px',
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                        <img key={image.id} src={image.urlPath} alt="Product" style={{ width: '150px' }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No images available.</p>
                )}
              </div>
            </div>
            <div className='formSubmit' >
              <Button type="button"
                value="Clear" onClick={handleClose}
                className='submitButton'
                variant="contained" size="large" color="error"
                sx={{
                  margin: '5px',
                }}>
                Close
              </Button>
            </div>
          </Box>
        </Container>
      </Modal>

    </div >
  )
}

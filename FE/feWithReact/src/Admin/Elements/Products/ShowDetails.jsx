import React, { useState, useEffect } from 'react'
import { Button, Box, Modal, Container } from '@mui/material'
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
    const url = 'https://localhost:7122/api/Product/GetProductDetailById/' + id
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
      }
    })
      .then(response => response.json())
      .then(data => {
        setProductDetails(data)
        console.log(data)
      })
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Button variant="contained" type="button" size="large" onClick={handleOpen}>
        DETAILS
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
          }} className="row">
            <h2>Product Details</h2>
            <div className='col-6'>

              <p>Name: {productDetails?.name}</p>
              <p>Gender: {productDetails?.gender ? 'Male' : 'Female'}</p>
              <p>Quantity: {productDetails?.quantity}</p>
              <p>Category: {productDetails?.category.name}</p>
              <p>Warranty Period: {productDetails?.warrantyDocuments.period} year(s)</p>
              <p>Warranty Terms: {productDetails?.warrantyDocuments.termsAndConditions}</p>
            </div>
            <div className='col-6 row'>
              <h3>Parts</h3>
              {productDetails?.productParts?.length > 0 ? (
                productDetails.productParts.map(part => (
                  <div key={part.id} className='col-6'>
                    <p>Main Part: {part.isMain ? 'Yes' : 'No'}</p>
                    <p>Diamond Origin: {part.diamond.origin}</p>
                    <p>Carat Weight: {part.diamond.caratWeight}</p>
                    <p>Clarity: {part.diamond.clarity}</p>
                    <p>Cut: {part.diamond.cut}</p>
                    <p>Color: {part.diamond.color}</p>
                    <p>Price: ${part.diamond.price}</p>
                    <p>Quantity: {part.diamond.quantity}</p>
                  </div>
                ))
              ) : (
                <p>No parts available.</p>
              )}
            </div>
            <div className='row'>
              <div className='col-6'>
                <h3>Sizes</h3>
                {productDetails?.productSizes?.length > 0 ? (
                  productDetails.productSizes.map(size => (
                    <p key={size.id}>Size: {size.size}, Price: ${size.price}</p>
                  ))
                ) : (
                  <p>No sizes available.</p>
                )}
              </div>
              <div className='col-6'>
                <h3>Images</h3>
                {productDetails?.images?.length > 0 ? (
                  productDetails.images.map(image => (
                    <img key={image.id} src={image.urlPath} alt="Product" style={{ width: '100px', height: '100px' }} />
                  ))
                ) : (
                  <p>No images available.</p>
                )}
              </div>
            </div>
          </Box>
        </Container>
      </Modal>

    </div >
  )
}

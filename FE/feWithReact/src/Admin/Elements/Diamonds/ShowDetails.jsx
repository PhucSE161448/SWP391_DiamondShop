import React, { useState, useEffect } from 'react';
import { Button, Box, Modal, Container } from '@mui/material';
import { createApi } from '../../../Auth/AuthFunction';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function ShowDetailsDiamond(props) {
  const [open, setOpen] = useState(false);
  const [diamondDetails, setDiamondDetails] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    GetDiamondDetails(props.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      GetDiamondDetails(props.id);
    }
  }, [open, props.id]);

  function GetDiamondDetails(id) {
    const url = createApi(`Diamond/GetDiamondDetailById/${id}`);
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setDiamondDetails(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching diamond details:', error);
      });
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
            bgcolor: 'background.paper',
            border: '1px solid #000',
            boxShadow: 24,
            p: 4,
            width: '50%',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <h2>Diamond Details</h2>
            </div>
            <div>
              <p>Origin: {diamondDetails?.origin}</p>
              <p>Color: {diamondDetails?.color}</p>
              <p>Carat Weight: {diamondDetails?.caratWeight}</p>
              <p>Clarity: {diamondDetails?.clarity}</p>
              <p>Cut: {diamondDetails?.cut}</p>
              <p>Name: {diamondDetails?.name}</p>
              <p>Price: ${diamondDetails?.price}</p>
              <p>Quantity: {diamondDetails?.quantity}</p>
            </div>
            <div>
              {diamondDetails?.images?.length > 0 ? (
                diamondDetails.images.map(image => (
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
  );
}

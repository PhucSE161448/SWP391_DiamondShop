import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal'

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [nameCategory, setnameCategory] = useState('')
  const [data, setData] = useState(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    // This effect runs when `data` changes
    if (data && data.status !== 400) {
      // Assuming `data.status` not being 400 means success
      setnameCategory(''); // Reset the nameCategory only on successful creation
    }
  }, [data])

  const handleSubmit = (event) => {
    event.preventDefault()
    // Gọi hàm CreateCaratWeight, truyền weight và price như là các đối số
    Create(nameCategory)
  }

  const handleClear = () => {
    setnameCategory('')
    setData(null)
  }

  function Create(Name) {
    const url = 'https://localhost:7122/api/Category/CreateCategory';
    const data = {
      name: Name
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData =>
        setData(responseData)
      )
  }
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '1px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <h3 className='titleOfForm'>CREATE CATEGORY</h3>
          <div>
            <form onSubmit={handleSubmit} className='row' style={{
              maxWidth: '25vw'
            }}>
              <div className='col'>
                <TextField type="text" value={nameCategory}
                  onChange={e => setnameCategory(e.target.value)} id="outlined-basic" label="Name" variant="outlined" className='form-control' />
              </div>
              {
                data && (data.status === 400 ? (
                  <h3>{data.errors.Price}</h3>
                ) : (
                  <h3>Create successful</h3>
                ))
              }
              <div className='formSubmit' >
                <Button
                  type="submit"
                  className='submitButton'
                  value="Submit" variant="contained"
                  size="large" endIcon={<SendIcon />}
                  sx={{
                    margin: '5px',
                  }}>
                  Send
                </Button>
                <Button type="button"
                  value="Clear" onClick={handleClear}
                  className='submitButton'
                  variant="contained" size="large" color="error"
                  endIcon={<CancelScheduleSendIcon />}
                  sx={{
                    margin: '5px',
                  }}>
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert, CircularProgress, Grid2 } from '@mui/material';
import axios from 'axios';
import CardItem from './CardItem';

function Servicos() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMessage, setOpenMessage] = useState(false);
	const [messageText, setMessageText] = useState("");
	const [messageSeverity, setMessageSeverity] = useState("success");
  const [cpf, setCPF] = useState("000.111.222-33")

  function handleCloseMessage(_, reason) {
		if (reason === "clickaway") {
			return;
		}
		setOpenMessage(false);
	}

  useEffect(() => {
    axios.get(`/my_services/?cpf=${cpf}`)
    .then((res) => {
      if(res.data.length === 0){
        setData([])
        setMessageSeverity("error")
        setMessageText("Não foi possível localizar os serviços!");
        setOpenMessage(true);
        setLoading(false);
      }else{
        setData(res.data);
        setLoading(false);
      }
    })
    .catch((error) => {
      setData([])
      setMessageSeverity("error")
      setMessageText("Não foi possível localizar os serviços!");
      setOpenMessage(true)
      setLoading(false)
      console.log(error)
    })
  }, [])

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        <Alert
          variant='filled'
          severity={messageSeverity}
          onClose={handleCloseMessage}
          sx = {{
            width: '100%'
          }}
        >
          {messageText}
        </Alert>
      </Snackbar>

      <Box 
        sx={{ 
          backgroundColor: '#000', 
          padding: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ color: 'white', marginLeft: '16px' }}
        >
          Meus Serviços
        </Typography>

        <Button 
          variant="contained" 
          sx={{ backgroundColor: '#fff', color: '#000', marginRight: '16px' }}
        >
          Adicionar Serviços
        </Button>
      </Box>

      <Grid2 container 
      spacing={3} 
      sx={{
        padding: 5
      }}>
        {loading ? (
          <CircularProgress />
        ) : (
          data.map((item) => (
            <Grid2 item xs={3} sm={6} md={4} key={item.cod_service}>
              <CardItem
              title={item.service_name}
              description={item.service_description}
              price={item.service_price}
              material={item.material_disp}
              type={item.type_name}
              />
            </Grid2>
          ))
        )}
      </Grid2>

      <Box sx={{ backgroundColor: '#fff', flexGrow: 1, position: 'relative' }}>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            position: 'absolute', 
            bottom: '16px', 
            right: '16px' 
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}

export default Servicos;
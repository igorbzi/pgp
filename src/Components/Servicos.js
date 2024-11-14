import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert, CircularProgress, Grid2 } from '@mui/material';
import axios from 'axios';
import CardItem from './CardItem';
import ModalPopUp from './Modal';
import SideBar from './SideBar';


function Servicos() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMessage, setOpenMessage] = useState(false);
	const [messageText, setMessageText] = useState("");
	const [messageSeverity, setMessageSeverity] = useState("success");
  const [cpf, setCPF] = useState("000.111.222-33")
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {setOpenModal(true)};
  const handleCloseModal = () => {setOpenModal(false); getData()};
  const[idService, setIdService] = useState(null);
  const[option, setOption] = useState(0);

  function handleCloseMessage(_, reason) {
		if (reason === "clickaway") {
			return;
		}
		setOpenMessage(false);
	}

  async function getData(){
    await axios.get(`/my_services/?cpf=${cpf}`)
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
  }

  async function deleteService(){
    console.log(idService)
    await axios.delete(`/services/?cpf=${cpf}&id=${idService}`)
    .then((res) => {
      setMessageSeverity("success")
      setMessageText("Serviço excluído com sucesso!")
      setOpenMessage(true);
    })
    .catch((error) => {
      setMessageSeverity("error");
      setMessageText("Ocorreu um erro na exclusão do serviço!");
      setOpenMessage(true);
    })
    getData()
  }

  useEffect(() => {
    getData();
  }, []);

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
        <Box>
          <SideBar colorIcon={"#FFFFFF"}/>
        </Box>
        <Typography 
          variant="h5" 
          sx={{ color: 'white', marginLeft: '16px' }}
        >
          Meus Serviços
        </Typography>

        <Button 
          variant="contained" 
          sx={{ backgroundColor: '#fff', color: '#000', marginRight: '16px', maxWidth: 200}}
          onClick={(e) => {setOption(0); handleOpenModal()}}
        >
          Adicionar Serviços
        </Button>
      </Box>

      <ModalPopUp
        openModal={openModal}
        handleClose={handleCloseModal}
        opt={option}
        id={idService}
        >

      </ModalPopUp>

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
              edit={(e) => {setIdService(item.cod_service); setOption(1); handleOpenModal()}}
              delete={(e) => {setIdService(item.cod_service); console.log(item.cod_service); console.log(idService); deleteService()}}
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
            right: '16px',
            maxWidth: 100
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}

export default Servicos;
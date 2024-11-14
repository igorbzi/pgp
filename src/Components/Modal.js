import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, InputAdornment, MenuItem, Modal, Radio, RadioGroup, TextField, Typography, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  display: 'grid',
  gap: 3,
  alignItems: 'center',
  p: 4,
  margin: 5,
};

function ModalPopUp(props){

  const [name, setName] = useState('');
  const [descr, setDescr] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');
  const [materialDisp, setMaterialDisp] = useState('false');
  const [categories, setCategorias] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
	const [messageText, setMessageText] = useState("");
	const [messageSeverity, setMessageSeverity] = useState("success");

  function handleCloseMessage() {
		setOpenMessage(false);
	}

  function clearForm(){
    setName('');
    setDescr('');
    setPrice(0);
    setType(0);
    setMaterialDisp('false')
  }

  function exitModal(){
    clearForm();
    props.handleClose();
  }

  async function getData(){
    try{
      const tipos = await axios.get('/categories')
      setCategorias(tipos.data);
      console.log(tipos);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, [])

  async function handleSubmit(){
    if(name === '' || price === '' || type === ''){
      setMessageSeverity("error")
      setMessageText("Preencha todos os campos necessários");
      setOpenMessage(true);
      return;
    }
    const reg = {
      service_name: name,
      service_description: descr,
      service_price: price,
      service_type: type,
      material_disp: materialDisp
    }

    try{
      axios.post('/services', reg)
      exitModal();
      console.log(reg)
    } catch (error){
      console.log(error)
    } 
  }

  return(
    <Modal
    open={props.openModal}
    onClose={exitModal}>

      <Box container sx={style}
      >
        <Typography item id="modal-modal-title" variant="h6" component="h2">
          Informe os Dados do Serviço
        </Typography>
        <TextField
          item
          label='Nome do serviço'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          slotProps={{
            html:{
              input: {
              maxLength: 10,
              },
            },
          }}
          >

        </TextField>
        <TextField
          item
          label='Descrição'
          value={descr}
          onChange={(e) => setDescr(e.target.value)}
          slotProps={{
            input: {
              maxLength: 600,
            },
          }}>

        </TextField>

        <Box item sx={{
          display: 'flex',
          gap: 2
        }}>
          <TextField
            item
            label='Preço'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              },
            }}>

          </TextField>
          <TextField
            item
            select
            fullWidth
            placeholder="Categoria do Serviço"
            required
            label='Tipo'
            value={type}
            onChange={(e) => setType(e.target.value)}>
           {
            categories.map((cat) => (
              <MenuItem key={cat.cod_type_service} value={cat.cod_type_service}>
                {cat.type_name}
              </MenuItem>
            ))
            // <MenuItem key={category.cod_type_service} value={category.cod_type_service}>{category.type_name}</MenuItem>
           }
              {/* <MenuItem key={1} value={1}>
                {'Limpeza'}
              </MenuItem>
              <MenuItem key={2} value={2}>
                {'Gerais'}
              </MenuItem> */}
          </TextField>
        </Box>

        <FormControl item>
          <FormLabel>Disponibiliza Materiais?</FormLabel>
          <RadioGroup
              row
              value={materialDisp}
              onChange={(e) => setMaterialDisp(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="false"
              name="radio-buttons-group">

            <FormControlLabel value='true' label='Sim' control={<Radio />} />
            <FormControlLabel value='false' label='Não' control={<Radio />} />
          </RadioGroup>
        </FormControl>
        
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Button
            color="error"
            onClick={exitModal}
            >
              Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="success"
            >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalPopUp;
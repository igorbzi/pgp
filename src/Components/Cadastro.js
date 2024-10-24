import React, { useState } from 'react';
import {verificarSenha} from '../utils/senha'
import { Box } from '@mui/material';

import './Cadastro.css';
import axios from "axios"
import { Alert, Snackbar } from '@mui/material';

function Login(){
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [senha, setSenha] = useState('');
  const [bairro, setBairro] = useState('');
  const [cpf, setCpf] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [telefone, setTelefone] = useState('');
  const [numero, setNumero] = useState('');
  const [telefone2, setTelefone2] = useState('');
  const [cep, setCep] = useState('');
  const [tipo, setTipo] = useState('');
  const [openMessage, setOpenMessage] = React.useState(false);
	const [messageText, setMessageText] = React.useState("");
	const [messageSeverity, setMessageSeverity] = React.useState("success");

  function handleCloseMessage(_, reason) {
		if (reason === "clickaway") {
			return;
		}
		setOpenMessage(false);
	}

  function clearForm(){
    setCpf("");
    setNome("");
    setEstado("");
    setTelefone("");
    setTelefone2("");
    setLogradouro("");
    setNumero("");
    setTipo("");
    setCep("");
    setBairro("");
    setCidade("");
    setEmail("");
    setSenha("");
  }

  async function handleSubmit(e){
    e.preventDefault()
    
    if(verificarSenha(senha)){

      try{
        const retorno = await axios.post("/users", 
          {
            cpf: cpf,
            nome: nome,
            passwd: senha,
            email: email,
            phone: telefone,
            phone2: telefone2,
            address: logradouro + ', ' + numero + ', '+ bairro + ', ' + cidade + ' - ' +  estado + ', CEP: ' + cep,
            type: parseInt(tipo)
          }
        )
        console.log(retorno)
        setMessageSeverity('primal');
        setMessageText('alerta');
        setOpenMessage(true);
      }
      catch(error){
        setMessageSeverity("error")
        setMessageText(error.response.data)
        console.log(error)
        setOpenMessage(true)
      }
    }
}

  return(
    <Box className='pagina' sx={{
      flexDirection: {
        xs: 'column', 
        sm: 'row', 
      },
      width: {
        xs: '100vw', 
        sm: 'row', 
      },

    }} >
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
      
      <Box className='esquerda' sx={{
              width: {
                xs: '100%', 
                sm: '25%', 
              }, 
              
              height: {
                xs: '30%', 
                sm: '100%', 
              },
              marginBottom: {
                xs: '2rem', 
                sm: '1rem', 
              }
      }}>
          <h1>QuickFix</h1>
        <Box>
          <p>Seja Bem Vindo!</p>
          <p>Faça sua conta agora mesmo.</p>
        </Box>
      </Box>
      <Box className='direita'  sx={{
        width: {
          xs: '100%', 
          sm: 'row', 
        },
        
      }}>
          <Box className='titulo' >
            <h3>Crie sua Conta</h3>
          </Box>
          <Box className="entradas">
            <form onSubmit={handleSubmit} >
            <input 
              type="text" 
              placeholder="Nome"
              maxLength="255"
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />
            
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              maxLength="50" 
            />
            
            <input 
              type="password" 
              placeholder="Senha"
              maxLength="50" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
            />
            <Box className='cidade_uf'>
              <input 
                type="text" 
                placeholder="Cidade" 
                maxLenght="150"
                value={cidade} 
                onChange={(e) => setCidade(e.target.value)} 
              />
              <select 
                    value={estado} 
                    onChange={(e) => setEstado(e.target.value)}
                  >
                  <option hidden disabled value="">
                    Estado
                  </option>
                  <option value="Acre">Acre</option>
                  <option value="Alagoas">Alagoas</option>
                  <option value="Amapá">Amapá</option>
                  <option value="Amazonas">Amazonas</option>
                  <option value="Bahia">Bahia</option>
                  <option value="Ceará">Ceará</option>
                  <option value="Distrito Federal">Distrito Federal</option>
                  <option value="Espírito Santo">Espírito Santo</option>
                  <option value="Goiás">Goiás</option>
                  <option value="Maranhão">Maranhão</option>
                  <option value="Mato Grosso">Mato Grosso</option>
                  <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                  <option value="Minas Gerais">Minas Gerais</option>
                  <option value="Pará">Pará</option>
                  <option value="Paraíba">Paraíba</option>
                  <option value="Paraná">Paraná</option>
                  <option value="Pernambuco">Pernambuco</option>
                  <option value="Piauí">Piauí</option>
                  <option value="Rio de Janeiro">Rio de Janeiro</option>
                  <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                  <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                  <option value="Rondônia">Rondônia</option>
                  <option value="Roraima">Roraima</option>
                  <option value="Santa Catarina">Santa Catarina</option>
                  <option value="São Paulo">São Paulo</option>
                  <option value="Sergipe">Sergipe</option>
                  <option value="Tocantins">Tocantins</option>
              </select>
            </Box>
            <input 
              type="text" 
              placeholder="Bairro" 
              maxLenght="50"
              value={bairro} 
              onChange={(e) => setBairro(e.target.value)} 
            />
              <input 
                type="text" 
                placeholder="CPF" 
                maxLength="14"
                value={cpf} 
                onChange={(e) => setCpf(e.target.value)} 
              />
            
            <input 
              type="text" 
              placeholder="Logradouro" 
              maxLength="50"
              value={logradouro} 
              onChange={(e) => setLogradouro(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Telefone" 
              maxLength="14"
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Número" 
              maxLenght="5"
              value={numero} 
              onChange={(e) => setNumero(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Telefone 2" 
              maxLength="14"
              value={telefone2} 
              onChange={(e) => setTelefone2(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Cep" 
              maxLength="9"
              value={cep} 
              onChange={(e) => setCep(e.target.value)} 
            />
            <select 
              className='selectTipo' 
              value={tipo} 
              onChange={(e) => setTipo(e.target.value)}
            >
              <option hidden disabled value="">
                Cliente ou Prestador
              </option>
              <option value="1">Prestador</option>
              <option value="0">Cliente</option>
            </select>
            <button 
            type="submit"
            >Cadastrar</button>
          </form>
          </Box>        
      </Box>
    </Box>
  );
}


export default Login;

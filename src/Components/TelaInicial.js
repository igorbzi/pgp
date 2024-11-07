import React from 'react';
import { Box, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Sidebar() {
  return (
    <Box
      sx={{
        width: 600,
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 10 }}>
        Menu
      </Typography>
      <Button sx={{color: 'black', backgroundColor: '#C4C7C4', width: '50%' }}>
        Meus Serviços
      </Button>
      <Button sx={{color: 'black', backgroundColor: '#C4C7C4', width: '50%' }}>
        Perfil
      </Button>
      <Button sx={{color: 'black', backgroundColor: '#C4C7C4', width: '50%' }}>
        Configurações
      </Button>
      <Button sx={{color: 'black', backgroundColor: '#C4C7C4', width: '50%' }}>
        Logout
      </Button>
    </Box>
  );
}

function ContentArea() {
  return (
    <Box
      sx={{
        flex: 1,
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <TextField
        placeholder="Buscar"
        variant="outlined"
        sx={{
          width: '50%',
          backgroundColor: '#E0E0E0',
          borderRadius: '8px',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

function TelaInicial() {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <ContentArea />
      </Box>
    );
  }
  
  export default TelaInicial;

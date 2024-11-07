import React from 'react';
import { Box, Typography, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Sidebar() {
  return (
    <Box
      sx={{
        width: 600,
        height: '100%',
        backgroundColor: 'black',
        color: 'white',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        borderTopRightRadius: '15px',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 10 }}>
        Menu
      </Typography>
      <Button sx={{ color: 'black', backgroundColor: '#C4C7C4', width: '50%' }}>
        Meus Serviços
      </Button>
      <Button sx={{ color: 'black', backgroundColor: '#C4C7C4', width: '50%' }}>
        Perfil
      </Button>
      <Button sx={{ color: 'black', backgroundColor: '#C4C7C4', width: '50%' }}>
        Configurações
      </Button>
      <Button sx={{ color: 'black', backgroundColor: '#C4C7C4', width: '50%' }}>
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
        height: '100%',
      }}
    >
      <TextField
        placeholder="Buscar"
        variant="outlined"
        sx={{
          width: '50%',
          backgroundColor: '#C4C7C4',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

function TelaInicial() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <Sidebar />
      <ContentArea />
    </Box>
  );
}

export default TelaInicial;

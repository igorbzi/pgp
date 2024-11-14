import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "./SideBar";


function ContentArea() {
  return (
    <Box
      sx={{
        flex: 1,
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100%",
      }}
    >
      <TextField
        placeholder="Buscar"
        variant="outlined"
        sx={{
          minWidth: "50%",
          backgroundColor: "#C4C7C4",
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
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        flexDirection: "column"
      }}
    >
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
          Quick Fix
        </Typography>
      </Box>
      <ContentArea />
    </Box>
  );
}

export default TelaInicial;

import React from "react";
import {
  Box,
  TextField,
  InputAdornment,
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
      }}
    >
      <SideBar/>
      <ContentArea />
    </Box>
  );
}

export default TelaInicial;

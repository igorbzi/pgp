import React from "react";
import {
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SideBar from "./SideBar";
import ListaServicos from "./ListaServicos";
import SearchBar from "./SearchBar";


function ContentArea() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection :"column",
        gap : "3rem",
        padding: 4,
        width : "100%",
        height: "auto",
      }}
    >
     
      <SearchBar />
      <ListaServicos/>
    </Box>
  );
}

function TelaInicial() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection : "row",
        height: "100vh",
        // overflow: "hidden",
      }}
    >
      <SideBar/>
      <ContentArea />
    </Box>
  );
}

export default TelaInicial;

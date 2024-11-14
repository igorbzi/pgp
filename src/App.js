import React from "react";
import Cadastro from "./Components/Cadastro";
import Servicos from "./Components/Servicos";
import TelaInicial from "./Components/TelaInicial";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common["Content-Type"] =
	"application/json;charset=utf-8";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/Cadastro" element={<Cadastro/>} />
        <Route path="/Servicos" element={<Servicos/>} />
      </Routes>
    </Router>
  );
}

export default App;

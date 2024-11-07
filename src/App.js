import React from "react";
import Servicos from "./Components/Servicos";
//import Cadastro from "./Components/Cadastro";
import TelaInicial from "./Components/TelaInicial";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common["Content-Type"] =
	"application/json;charset=utf-8";


function App() {
  return (
    <div>
      <TelaInicial />
    </div>
  );
}

export default App;

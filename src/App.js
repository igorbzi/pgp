import React from "react";
import Cadastro from "./Components/Cadastro";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common["Content-Type"] =
	"application/json;charset=utf-8";


function App() {
  return (
    <div>
      <Cadastro />
    </div>
  );
}

export default App;

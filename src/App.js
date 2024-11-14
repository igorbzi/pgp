import React, { useState, useEffect } from "react";
import Cadastro from "./Components/Cadastro";
import Servicos from "./Components/Servicos";
import TelaInicial from "./Components/TelaInicial";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";


axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.common["Content-Type"] =
	"application/json;charset=utf-8";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
		// verifica se já está logado
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

  const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// Clear the token from localStorage
		localStorage.removeItem("token");
		setIsLoggedIn(false);
	};

  const Private = ({Elemento}) => {
		return isLoggedIn ? <Elemento onLogout={handleLogout}/> : <Login onLogin={handleLogin} />
	}

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro/>} />
        <Route path="/Servicos" element={<Servicos/>} />
      </Routes>
    </Router>
  );
}

export default App;

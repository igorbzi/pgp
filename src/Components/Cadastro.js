import React, { useState } from 'react';
import './Cadastro.css';
import { validarEFormatarCPF } from '../utils/mascara';
import { validarEFormatarTelefone } from '../utils/mascara';
import { validarEmail } from '../utils/mascara';

function Cadastro(){
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

  const handleCpfChange = (e) => {
    setCpf(validarEFormatarCPF(e.target.value));
  };

  const handleTelefoneChange = (e) => {
    setTelefone(validarEFormatarTelefone(e.target.value));
};

const handleTelefoneChange2 = (e) => {
  setTelefone2(validarEFormatarTelefone(e.target.value));
};

const handleEmailChange = (e) => {
  const valor = e.target.value;
  (validarEmail(valor))
  setEmail(valor);
};

  return(
    <div className='pagina'>
      <div className='esquerda'>
        <h1>QuickFix</h1>
        <p>Seja Bem Vindo! <br/>Faça sua conta agora mesmo.</p>
      </div>
      <div className='direita'>
        <form>
        <div className='titulo'>
        <legend>Crie sua Conta</legend>
        </div>
          <input 
            type="text" 
            placeholder="Nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />
          <div className='SelectEst'>
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
          </div>
          <input 
            type="text" 
            placeholder="Email" 
            value={email} 
            onChange={handleEmailChange} 
          />
          <input 
            type="text" 
            placeholder="Cidade" 
            value={cidade} 
            onChange={(e) => setCidade(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Bairro" 
            value={bairro} 
            onChange={(e) => setBairro(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="CPF" 
            value={cpf} 
            onChange={handleCpfChange} 
          />
          <input 
            type="text" 
            placeholder="Logradouro" 
            value={logradouro} 
            onChange={(e) => setLogradouro(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Telefone" 
            value={telefone} 
            onChange={handleTelefoneChange}
          />
          <input 
            type="text" 
            placeholder="Número" 
            value={numero} 
            onChange={(e) => setNumero(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Telefone 2" 
            value={telefone2} 
            onChange={handleTelefoneChange2}
          />
          <input 
            type="text" 
            placeholder="Cep" 
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
            <option value="Prestador">Prestador</option>
            <option value="Cliente">Cliente</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}


export default Cadastro;

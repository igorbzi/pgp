/*import './Login.css';




function Login(){
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
        <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Estado" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Cidade" />
          <input type="text" placeholder="Senha" />
          <input type="text" placeholder="Bairro" />
          <input type="text" placeholder="CPF" />
          <input type="text" placeholder="Logradouro" />
          <input type="text" placeholder="Telefone" />
          <input type="text" placeholder="Número" />
          <input type="text" placeholder="Telefone 2" />
          <input type="text" placeholder="Cep" />
          <select>
            <option hidden disabled selected>Cliente ou Prestador</option>
            <option>Prestador</option>
            <option>Cliente</option>
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
/*
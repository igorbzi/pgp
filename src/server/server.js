const express = require('express')
const app = express()
const cors = require('cors')

const pgp = require("pg-promise")({});
const usuario = "postgres";
const senha = "1211igorbd";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/pgp`);

app.use(cors());

app.use(express.json());

app.listen(3001 , (error)=>{
  if(error) throw error
  console.log('Servidor Rodando na porta 3001 ')
})

app.get("/" , (req, res)=>{
  res.send('Bem-vindo no nosso App')
})

/*-----------------users---------------------*/
app.get("/user", async (req, res)=> {
  try {
    const fornecedor = await db.any(
      "select cpf, username, user_email, user_phone, user_phone2, user_address from users"
    );
    res.json(fornecedor).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
})

app.post("/users", async (req, res) => {
  try {

    const cpf = req.body.cpf;
    const nome = req.body.nome;
    const passwd = req.body.passwd;
    const email = req.body.email;
    const phone = req.body.phone;
    const phone2 = req.body.phone2;
    const address = req.body.address;
    
    console.log(`CPF: ${cpf} Nome: ${nome}`);

    db.none(
      "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7);",   //passando parâmetros
      [cpf, nome, passwd, email, phone, phone2, address]
    );
    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
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
app.get("/users", async (req, res)=> {
  try {
    const user = await db.any(
      "select cpf, username, user_email, user_phone, user_phone2, user_address from users"
    );
    res.json(user).status(200);
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

    const unique_cpf = await db.oneOrNone(
      "SELECT 1 from users where cpf = $1",
      [cpf]
    )

    const unique_email = await db.oneOrNone(
      "SELECT 1 from users where user_email = $1",
      [email]
    )

    const unique_phone = await db.oneOrNone(
      "SELECT 1 from users where user_phone = $1",
      [phone]
    )
    
    if(unique_cpf) {
      res.status(400).send("CPF já cadastrado");
      return;
    } else if (unique_email){
      res.status(400).send("Email já cadastrado");
      return;
    } else if(unique_phone){
      res.status(400).send("Telefone principal já cadastrado");
      return;
    }

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

app.delete("/users", async (req, res) => {
  try{

    const id = req.body.cpf; //pega parametro da req

    db.none(
        "DELETE from users where cpf = $1;", [id] //deleta pelo cpf
    );
    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(400)
  }
});

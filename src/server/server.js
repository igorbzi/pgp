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


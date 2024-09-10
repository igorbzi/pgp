const express = require('express')
const app = express()

app.listen(3001 , ()=>{
    console.log('Servidor Rodando na porta 3001 ')
})


app.get("/" , (req,res)=>{
    res.send('Bemvindo no nosso App')
})
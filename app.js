//Importa o express
const express = require('express');
//Faz uma instancia dele
const app = express();

//Request, response e next
app.use('/teste',(req,res,next) => {
    res.status(200).send({
        mensagem:'Ok,Deu certo'
    })
})

module.exports = app


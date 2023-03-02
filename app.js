
// Arquivo para configuracao das respostas em HTTP

//Importa o express
const express = require('express');
//Faz uma instancia dele
const app = express();
// Morgan - Realiza monitoramento de requisicoes
const morgan = require('morgan');
// Defini a rota de produtos
const productRoute = require('./routes/products')

app.use(morgan('dev'));
//Defini como será o nome da rota, e "chama a referencia"
app.use('/products',productRoute);
//Request, response e next
app.use('/teste',(req,res,next) => {
    res.status(200).send({
        mensagem:'Ok,Deu certo'
    });
});

module.exports = app;


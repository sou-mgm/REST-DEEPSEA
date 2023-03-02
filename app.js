
// Arquivo para configuracao das respostas em HTTP

//Importa o express
const express = require('express');
//Faz uma instancia dele
const app = express();
// Morgan - Realiza monitoramento de requisicoes
const morgan = require('morgan');
// Defini a rota de produtos
const productRoute = require('./routes/products')

//Rotas das informacoes
app.use(morgan('dev'));
//Defini como será o nome da rota, e "chama a referencia"
app.use('/products',productRoute);


//Tratamento de erros, caso seja digitado uma rota inexistente
app.use((req,res,next) => {
    const erro = new Error('404 - Não encontrado');
    erro.status = 404;
    next(erro)
});

app.use((error,req,res,next)=> {
    //Apresenta erro, ou caso nao encontre o erro, retorna 500
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;


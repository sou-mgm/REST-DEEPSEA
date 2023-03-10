
// Arquivo para configuracao das respostas em HTTP

//Importa o express
const express = require('express');
//Faz uma instancia dele
const app = express();
// Morgan - Realiza monitoramento de requisicoes
const morgan = require('morgan');
// BodyParser - módulo capaz de converter o body da requisição para vários formatos.
const bodyParser = require('body-parser');
// Defini a rota de produtos
const productRoute = require('./routes/products');
//Defini a rota de pedidos
const ordersRoute = require('./routes/orders')

//Rotas das informacoes
app.use(morgan('dev'));
//Setuo do body como sendo para apenas dados simples
app.use(bodyParser.urlencoded({extended: false}));
//Em formato JSON
app.use(bodyParser.json());

//Defini como será o nome da rota, e "chama a referencia"
app.use('/products',productRoute);

app.use('/orders',ordersRoute);

//Tratamento de CORS - Permitindo o acesso de todos, só em JSON
app.use((req,res,next)=> {
    res.header('Acces-Control-Allow-Origin','*');
    res.header('Acces-Control-Allow-Header',
    'Origin,X-Requrested-With, Content-Type,Accept, Authorization');

    if (req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({})
    }

    next();
});

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


// Servidor, onde é criado a REST API


// Cria um servo padrao de requisicao
const http = require('http');
//Regasta o objeto http 
const app = require('./app')
// Defini a porta
const port = process.env.PORT || 3000;
// Cria um servidor 
const server = http.createServer(app);
//Add a porta ao servidor
server.listen(port);





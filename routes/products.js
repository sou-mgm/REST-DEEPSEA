// Rota de produtos, onde serao separadores as informacoes

const express = require('express');
const router = express.Router();

// Retorna todos os produtos
router.get('/', (req,res,next) => {
    res.status(200).send({
        mensagem:'Usando o get dentro da rota de produtos'
    });
});


router.get('/:id_product', (req,res,next) => {
    //Recupera o valor de :id_product
    const id = req.params.id_product 
    if (id === '1234'){
        res.status(200).send({
            mensagem:'Produto encontrado', 
            id: id
        });
    } else {
        res.status(200).send({
            mensagem:'ID nao encontrado.', 
            
        });
    }
});


module.exports = router;
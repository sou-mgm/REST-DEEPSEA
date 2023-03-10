// Rota de pedidos
const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna todos os orderutos
router.get('/', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM orders',
            (error, result ,field) => {

                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }
                
                const response = {
                    quantity: result.length,
                    orders: result.map(order =>{
                        return {
                            id_order: order.id_order,
                            products_id_product: order.products_id_product,
                            quantity: order.quantity,
                            request: {
                                type: 'GET', 
                                description: 'Retorna todos os pedidos',
                                url: 'http://localhost:3000/orders/' + order.id_order 
                            }

                        }
                    })
                }

                return res.status(200).send(response);

            }
        )
    });
});

router.get('/:id_order', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM orders WHERE id_order = ?;',
            [req.params.id_order],
            (error, result ,field) => {

                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }

                if (result.length == 0){
                    return res.status(404).send({
                        message:'Não encontrado'
                    })
                }
                
                const response = {
                    order: {
                            id_order: result[0].id_order,
                            products_id_product: result[0].products_id_product,
                            quantity: result[0].quantity ,
                            request: {
                                type: 'GET', 
                                description: 'Retorna produto especifico',
                                url: 'http://localhost:3000/products'
                            }

                        
                    }
                }

                return res.status(200).send(response);

            }
        )
    });
});



// Para cadastro de produtos.
router.post('/', (req, res, next) => {

    //Tratamento de erros - Caso não exista produto
    mysql.getConnection((error, conn) => {
        
        if(error) {return res.status(500).send({error: error})}
        

         // Inseri novo produto
        conn.query(
            'INSERT INTO orders (id_order,products_id_product,quantity) VALUES (?,?,?)',
            [req.body.id_order,req.body.products_id_product,req.body.quantity],
            (error, result ,field) => {
                //Método importante - Realiza um release do pull, evitando congestionamento nas chamadas
                conn.release();

                if(error) {return res.status(500).send({error: error})}

                const response = {
                    product: {
                            id_order: req.body.id_order,
                            products_id_product: req.body.products_id_product ,
                            quantity: req.body.quantity ,
                            request: {
                                type: 'POST', 
                                description: 'Inserido um novo pedido',
                                url:'http://localhost:3000/orders'
                            }

                        
                    }
                }

                return res.status(201).send(response);

            }
        );

    });

   
});

// Para alterar um produto
router.patch('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `UPDATE orders SET products_id_product = ?,quantity = ? WHERE id_order = ?`,
            [req.body.products_id_product,req.body.quantity,req.body.id_order],
            (error, result ,field) => {
                //Método importante - Realiza um release do pull, evitando congestionamento nas chamadas
                conn.release();
                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    product: {
                            id_order: req.body.id_order,
                            products_id_product: req.body.products_id_product,
                            quantity: req.body.quantity,
                            request: {
                                type: 'PATCH', 
                                description: 'Produto alterado com sucesso',
                                url: 'http://localhost:3000/orders/' 
                            }
                    }
                }

                return res.status(202).send(response);

            }
        )
    });

});

// Para deletar um produto
router.delete('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `DELETE FROM orders WHERE id_order = ?`,[req.body.id_order],
            (error, result ,field) => {
                //Método importante - Realiza um release do pull, evitando congestionamento nas chamadas
                conn.release();
                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    product: {
                            id_order: req.body.id_order,
                            request: {
                                type: 'DELETE', 
                                description: 'Produto deletado com sucesso',
                                url: 'http://localhost:3000/orders/' 
                            }
                    }
                }

                return res.status(202).send(response);

            }
        )
    });

});




module.exports = router;
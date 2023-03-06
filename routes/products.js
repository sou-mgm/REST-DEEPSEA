// Rota de produtos, onde serao separadores as informacoes

const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna todos os produtos
router.get('/', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM products',
            (error, result ,field) => {

                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }

                return res.status(200).send({
                    result: result,
                });

            }
        )
    });
});


router.get('/:id_product', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM products WHERE id_product = ?;',
            [req.params.id_product],
            (error, result ,field) => {

                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }

                return res.status(200).send({
                    result: result,
                });

            }
        )
    });
});

// Para cadastro de produtos
router.post('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'insert into products (id_product,name,price,imageName,description,measurementChart,size,category,itsNew,itsTopProduct) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [req.body.id_product,req.body.name,req.body.price,req.body.imageName,req.body.description,req.body.measurementChart,req.body.size,req.body.category,req.body.itsNew,req.body.itsTopProduct],
            (error, result ,field) => {
                //Método importante - Realiza um release do pull, evitando congestionamento nas chamadas
                conn.release();

                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Inserido um novo produto com sucesso',
                    id_product: result.insertId
                });

            }
        )
    });

});

// Para alterar um produto
router.patch('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `UPDATE products SET name = ?,price = ?,imageName = ?,description = ?,measurementChart = ?,size = ?,category = ?,itsNew = ?,itsTopProduct = ? WHERE id_product = ?`,
            [req.body.name,req.body.price,req.body.imageName,req.body.description,req.body.measurementChart,req.body.size,req.body.category,req.body.itsNew,req.body.itsTopProduct,req.body.id_product],
            (error, result ,field) => {
                //Método importante - Realiza um release do pull, evitando congestionamento nas chamadas
                conn.release();
                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }

                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso'
                });

            }
        )
    });

});

// Para deletar um produto
router.delete('/', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `DELETE FROM products WHERE id_product = ?`,[req.body.id_product],
            (error, result ,field) => {
                //Método importante - Realiza um release do pull, evitando congestionamento nas chamadas
                conn.release();
                if(error){
                    return res.status(500).send ({
                        error: error,
                        response: null
                    });
                }

                res.status(202).send({
                    mensagem: 'Produto deletado com sucesso'
                });

            }
        )
    });

});


module.exports = router;




//const product = {
    //     id: req.body.id ,
    //     name: req.body.name ,
    //     price: req.body.price ,
    //     imageName: req.body.imageName ,
    //     description: req.body.description ,
    //     measurementChart: req.body.measurementChart ,
    //     size: req.body.size ,
    //     category: req.body.category ,
    //     itsNew: req.body.itsNew ,
    //     itsTopProduct: req.body.itsTopProduct ,
    // }

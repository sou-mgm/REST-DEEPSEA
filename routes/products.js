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
                
                const response = {
                    quantity: result.length,
                    products: result.map(prod =>{
                        return {
                            id_product: prod.id_product,
                            name: prod.name,
                            price: prod.price,
                            imageName: prod.imageName ,
                            description:  prod.description ,
                            measurementChart:  prod.measurementChart ,
                            size:  prod.size ,
                            category:  prod.category ,
                            itsNew:  prod.itsNew ,
                            itsTopProduct:  prod.itsTopProduct ,
                            request: {
                                type: 'GET', 
                                description: 'Retorna todos os produtos',
                                url: 'http://localhost:3000/products/' + prod.id_product
                            }

                        }
                    })
                }

                return res.status(200).send(response);

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

                if (result.length == 0){
                    return res.status(404).send({
                        message:'Não encontrado'
                    })
                }
                
                const response = {
                    product: {
                            id_product: result[0].id_product ,
                            name: result[0].name ,
                            price: result[0].price ,
                            imageName: result[0].imageName ,
                            description: result[0].description ,
                            measurementChart: result[0].measurementChart ,
                            size: result[0].size ,
                            category: result[0].category ,
                            itsNew: result[0].itsNew ,
                            itsTopProduct: result[0].itsTopProduct ,
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

                const response = {
                    product: {
                            id_product: req.body.id_product ,
                            name: req.body.name ,
                            price: req.body.price ,
                            imageName: req.body.imageName ,
                            description: req.body.description ,
                            measurementChart: req.body.measurementChart ,
                            size: req.body.size ,
                            category: req.body.category ,
                            itsNew: req.body.itsNew ,
                            itsTopProduct: req.body.itsTopProduct ,
                            request: {
                                type: 'POST', 
                                description: 'Inserido um novo produto',
                                url: 'http://localhost:3000/products'
                            }

                        
                    }
                }

                return res.status(201).send(response);

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

                const response = {
                    product: {
                            id_product: req.body.id_product,
                            name: req.body.name ,
                            price: req.body.price ,
                            imageName: req.body.imageName ,
                            description: req.body.description ,
                            measurementChart: req.body.measurementChart ,
                            size: req.body.size ,
                            category: req.body.category ,
                            itsNew: req.body.itsNew ,
                            itsTopProduct: req.body.itsTopProduct ,
                            request: {
                                type: 'PATCH', 
                                description: 'Produto alterado com sucesso',
                                url: 'http://localhost:3000/products/' + req.body.id_product
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

                const response = {
                    product: {
                            id_product: req.body.id_product,
                            name: req.body.name ,
                            price: req.body.price ,
                            imageName: req.body.imageName ,
                            description: req.body.description ,
                            measurementChart: req.body.measurementChart ,
                            size: req.body.size ,
                            category: req.body.category ,
                            itsNew: req.body.itsNew ,
                            itsTopProduct: req.body.itsTopProduct ,
                            request: {
                                type: 'DELETE', 
                                description: 'Produto deletado com sucesso',
                                url: '' 
                            }
                    }
                }

                return res.status(202).send(response);

            }
        )
    });

});


module.exports = router;





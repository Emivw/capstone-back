const express = require('express');
const { db, pool } = require('../config/db');
const prodRouter = express.Router();

prodRouter.get('/', async (req, res, next) => {
    try {
        const products = await db.allProd();
        res.json({ products: products });
        // req.products = products;
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});
prodRouter.get('/:id', (req, res, next) => {
    pool.query(
        `SELECT * FROM Products WHERE prodID = ?`,
        req.params.id,
        (err, results) => {
            // user does not exists
            if (err) {
                return res.status(400).send({
                    msg: err
                });
            }
            else {
                res.json({
                    status: 200,
                    results: results
                })
            }
        })
});

prodRouter.post('/', async (req, res, next) => {
    try {
        const prodTitle = req.body.products.prodTitle;
        const prodCat = req.body.products.prodCat;
        const prodStock = req.body.products.prodStock;
        const prodDesc = req.body.products.prodDesc;
        const prodPrice = req.body.products.prodPrice;


        if (!prodTitle || !prodCat || !prodStock || !prodDesc || !prodColor || !prodPrice) {
            return res.sendStatus(400);
        }



        const products = await db.insertprod(prodTitle, prodCat, prodStock, prodDesc, prodColor, prodPrice);
        res.json({ products: products });


    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});




prodRouter.put('/:id', async (req, res, next) => {
    try {
        const prodTitle = req.body.products.prodTitle;
        const prodCat = req.body.products.prodCat;
        const prodStock = req.body.products.prodStock;
        const prodDesc = req.body.products.prodDesc;
        const prodPrice = req.body.products.prodPrice;
        const id = req.params.id;


        if (!prodTitle || !prodCat || !prodStock || !prodDesc || !prodColor || !prodPrice) {
            return res.sendStatus(400);
        }



        const products = await db.insertprod(prodTitle, prodCat, prodStock, prodDesc, prodColor, prodPrice, id);
        res.json({ products: products });


    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});



prodRouter.delete('/:id', async (req, res, next) => {
    try {
        const prodId = req.params.id
        const products = await db.deleteProd(prodId);
        res.json({ message: "product deleted" })
        return res.sendStatus(204);

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});











module.exports = prodRouter;
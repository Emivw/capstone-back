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
prodRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await db.getProdById(id);
        res.json({ product: product });
        // req.products = products;
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});

prodRouter.post('/', async (req, res, next) => {
    try {
        const prodTitle = req.body.prodTitle;
        const prodCat = req.body.prodCat;
        const prodStock = req.body.prodStock;
        const prodDesc = req.body.prodDesc;
        const prodColor = req.body.prodColor;
        const prodPrice = req.body.prodPrice;
        const prodImg1 = req.body.prodImg1;
        const prodImgs = req.body.prodImgs;


        if (!prodTitle || !prodCat || !prodStock || !prodDesc || !prodColor || !prodPrice) {
            return res.sendStatus(400);
        }



        const products = await db.insertProd(prodTitle, prodCat, prodStock, prodDesc, prodColor, prodPrice, prodImg1, prodImgs);
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
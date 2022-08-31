const express = require('express');
const {db} = require('../config/db');
const prodRouter = express.Router();


prodRouter.get('/', async (req, res, next) => {
    try {
        const prod = await db.getAllProd
        req.prod = prod;
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});

prodRouter.params('/:prodID', async (req, res, next, prodID) => {
    try {
        const prod = await db.getProdById(prodID);
        req.prod = prod;
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});



prodRouter.get('/:prodID', (req, res, next) => {
    res.status(200).json({ prod: req.prod });

});




prodRouter.post('/', async (req, res, next) => {
    try {
        const fullname = req.body.prod.fullname;
        const email = req.body.prod.email;
        let password = req.body.prod.password;


        if (!fullname || !email || !password) {
            return res.sendStatus(400);
        }

        const salt = genSaltSync(10);
        password = hashSync(password, salt);



        const prod = await db.insertprod(prodName, email, password);
        res.json({ prod: prod });


    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});




prodRouter.put('/:id', async (req, res, next) => {
    try {
        const prodName = req.body.prod.prodName;
        const role = req.body.prod.role;
        const email = req.body.prod.email;
        let password = req.body.prod.password;
        const prodId = req.params.id;


        if (!prodName || !role || !email || !password) {
            return res.sendStatus(400);
        }

        const salt = genSaltSync(10);
        password = hashSync(password, salt);



        const prod = await db.updateProd(prodName, role, email, password, prodId);
        res.json({ message: "prod updated" });


    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});



prodRouter.delete('/:id', async (req, res, next) => {
    try {
        const prodId = req.params.id
        const prod = await db.deleteProd(prodId);
        return res.sendStatus(204);

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});



prodRouter.get('/', async (req, res, next) => {
    try {
        const prods = await db.allProd();
        res.json({ prods: prods });
    } catch (e) {
        console.log(e);
    }
});








module.exports = prodRouter;
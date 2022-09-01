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
// prodRouter.get('/:id', async (req, res, next, id) => {
//     try {
//         const product = await db.getProdById(id);
//         console.log(product);
//         products = res.json({ product: product });
//         next();
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(404);
//     }
// });



// prodRouter.get('/:id', (req, res) => {
//     try {
//         res.status(200).json({ product: products });
//     }
//     catch (e) {
//     console.log(e);
//     res.sendStatus(404);
// }

// });




// prodRouter.post('/', async (req, res, next) => {
//     try {
//         const fullname = req.body.prod.fullname;
//         const email = req.body.prod.email;
//         let password = req.body.prod.password;


//         if (!fullname || !email || !password) {
//             return res.sendStatus(400);
//         }

//         const salt = genSaltSync(10);
//         password = hashSync(password, salt);



//         const prod = await db.insertprod(prodName, email, password);
//         res.json({ prod: prod });


//     } catch (e) {
//         console.log(e);
//         res.sendStatus(400);
//     }
// });




// prodRouter.put('/:id', async (req, res, next) => {
//     try {
//         const prodName = req.body.prod.prodName;
//         const role = req.body.prod.role;
//         const email = req.body.prod.email;
//         let password = req.body.prod.password;
//         const prodId = req.params.id;


//         if (!prodName || !role || !email || !password) {
//             return res.sendStatus(400);
//         }

//         const salt = genSaltSync(10);
//         password = hashSync(password, salt);



//         const prod = await db.updateProd(prodName, role, email, password, prodId);
//         res.json({ message: "prod updated" });


//     } catch (e) {
//         console.log(e);
//         res.sendStatus(400);
//     }
// });



// prodRouter.delete('/:id', async (req, res, next) => {
//     try {
//         const prodId = req.params.id
//         const prod = await db.deleteProd(prodId);
//         return res.sendStatus(204);

//     } catch (e) {
//         console.log(e);
//         res.sendStatus(400);
//     }
// });











module.exports = prodRouter;
const express = require('express');
const {db} = require('../config/db');
const userRouter = express.Router();

const { hashSync, genSaltSync, compareSync } = require("bcrypt");


userRouter.get('/', async (req, res, next) => {
    try {
        const users = await db.allUser();
        res.json({ users: users });
    } catch (e) {
        console.log(e);
    }
});

// userRouter.get('user', async (req, res, next) => {
//     try {
//         const user = await db.getAllUsers
//         req.user= user;
//         next();
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(404);
//     }
// });
userRouter.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await db.getUserById(userId);
        res.json({ users: user });
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});



// userRouter.get('/:userId', (req, res, next) => {
//     res.status(200).json({ user: req.user });

// });




userRouter.post('/', async (req, res, next) => {
    try {
        const fullname = req.body.fullname;
        const email = req.body.email;
        let password = req.body.password;
        const role_id = req.body.role_id;
        const phone = req.body.phone;


        if (!fullname || !email || !password || !phone || !role_id) {
            return res.sendStatus(400);
        }

        const salt = genSaltSync(10);
        password = hashSync(password, salt);



        const user = await db.insertUser(fullname, email, password, role_id, phone);
        res.json({ user: user });


    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});




userRouter.put('/:id', async (req, res, next) => {
    try {
        const fullname = req.body.fullname;
        const role_id = req.body.role_id;
        const email = req.body.email;
        const phone = req.body.phone;
        let password = req.body.password;
        const id = req.params.id;


        if (!fullname || !role_id || !email || !password) {
            return res.sendStatus(400);
        }

        const salt = genSaltSync(10);
        password = hashSync(password, salt);



        const user = await db.updateUser(fullname, role_id, email, password, phone, id);
        res.json({ message: "user updated" });


    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});



userRouter.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await db.deleteUser(userId);
        return res.sendStatus(204);

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});












module.exports = userRouter;
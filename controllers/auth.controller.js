const express = require('express');
const authRouter = express.Router();
const userRouter = require('./user.controller');
const prodRouter = require('./product.controller');
const jsonwebtoken = require('jsonwebtoken');
const { db } = require('../config/db');
// const { getUserByEmail } = require('../config/db');
// const  = require('../config/db');

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const cookieParser = require('cookie-parser');


authRouter.use(cookieParser());

authRouter.post('/register', async (req, res, next) => {
    try {
        const fullname = req.body.fullname;
        const email = req.body.email;
        const phone = req.body.phone;
        let password = req.body.password;
        const role_id = 3;

        if (!fullname || !email || !password || !phone) {
            return res.sendStatus(400);
        }
        
        const salt = genSaltSync(10);
        password = hashSync(password, salt);
        
        
        
        const user = await db.insertUser(role_id, email, password, fullname, phone);
        
        const jsontoken = jsonwebtoken.sign({ user: user }, process.env.SECRET_KEY, { expiresIn: '30m' });
        res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict', expires: new Date(Number(new Date()) + 30 * 60 * 1000) }); //we add secure: true, when using https.
        
        let users = await db.getUserByEmail(email);

        res.json({
            token: jsontoken,
            user: users
        });

        //return res.redirect('/mainpage');

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});




authRouter.post('/login', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        let user = await db.getUserByEmail(email);

        if (!user) {
            return res.json({
                message: "Invalid email or password"
            })
        }

        const isValidPassword = compareSync(password, user.password);
        if (isValidPassword) {
            const jsontoken = jsonwebtoken.sign({ user: user }, process.env.SECRET_KEY, { expiresIn: '30m' });
            res.cookie('token', jsontoken, { httpOnly: true, secure: true, SameSite: 'strict', expires: new Date(Number(new Date()) + 30 * 60 * 1000) }); //we add secure: true, when using https.

            res.status(200).json({
                token: jsontoken,
                user: user
            });
            //return res.redirect('/mainpage') ;

        } else {
            return res.json({
                message: "Invalid email or password"
            });
        }

    } catch (e) {
        console.log(e);
    }
});
//  Verify Token
async function verifyToken(req, res, next) {

    const token = req.cookies.token;
    console.log(token);

    if (token === undefined) {

        return res.json({
            message: "Access Denied! Unauthorized User"
        });
    } else {

        jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, authData) => {
            if (err) {
                res.json({
                    message: "Invalid Token..."
                });

            } else {

                console.log(authData.user.role_id);
                const role = authData.user.role_id;
                if (role === "admin") {

                    next();
                } else {
                    return res.json({
                        message: "Access Denied! you are not an Admin"
                    });

                }
            }
        })
    }
}





authRouter.use('/user', verifyToken, userRouter);
authRouter.use('/product', verifyToken, prodRouter);

module.exports = authRouter;
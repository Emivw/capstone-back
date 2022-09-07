require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./controllers/auth.controller');
const prodRouter = require("./controllers/product.controller");
const userRouter = require("./controllers/user.controller");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json(), bodyParser.json(), bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
}, cors({
    origin: ['http://192.168.9.28:8080', 'http://localhost:8080'],
    credentials: true
}));
app.get('/', (req, res) => {
    res.json({
        message: 'paths on how to use this api',
        products: {
            getProducts: "/products",
            getProduct: "/products/id",
            postProducts: "/products",
            patchProducts: "/products/id",
            deleteProducts: "/products/id"
        },
        users: {
            getUsers: "/user",
            getUser: "/user/id",
            postUser: "/user",
            patchUser: "/user/id",
            deleteUser: "/user/id"
        },
        auth: {
            Register: "/auth/register",
            login: "/auth/login"
        }
    });
});


authRouter.use(cookieParser());

app.use('/auth', authRouter);
app.use('/products', prodRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`server is listening  on http://localhost:${PORT}`);
});

module.exports = app;
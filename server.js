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
    res.json({ message: 'restfull-api working' });
});


authRouter.use(cookieParser());

app.use('/auth', authRouter);
app.use('/prod', prodRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`server is listening  on http://localhost:${PORT}`);
});

module.exports = app;
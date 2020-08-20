require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

const mySqlConnection = require('./dbConnection');

const userManage = require('./routes/userManage');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

// ------------------------------------------- routes --------------------------------------------------- //
app.use('/api/usrLogin', userManage);
// app.use('/api/shop', shopsManageRoutes);
// app.use('/api/product', productmanageRoutes);
// app.use('/api/cart', cartManageRoutes);


// ------------------------------------------------------------------------------------------------------ //

const port = (4500);

app.listen(port, () => {
    console.log(port);
});

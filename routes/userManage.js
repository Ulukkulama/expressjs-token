const express = require('express');
const jwt = require('jsonwebtoken');

const SqlConnection = require('../dbConnection');


const Router = express.Router();

const pos = [
    { userName: 'jani', pa: 'z' },
    { userName: 'bim', pa: 'y' }
]

Router.get('/', authenticatedToken, (req, res) => {
    console.log(req);
    res.json(pos.filter(p => p.userName == req.user.name));
});

Router.post('/', (req, res) => {

    const userName = req.body.uName;

    const user = { name: userName }

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({accs:token});
});

// token verification middleware
function authenticatedToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { return res.sendStatus(403); }
        req.user = user;
        next()
    })
}

module.exports = Router;
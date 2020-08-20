require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

const Router = express.Router();

app.use(bodyParser.json());

let RefreshToken = [] // please create db for stor tokens

// //////////////////////////////////////////////////////////////////
const pos = [
    { userName: 'jani', pa: 'z' },
    { userName: 'bim', pa: 'y' }
]

app.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        return res.sendStatus(401);
    }
    if (!RefreshToken.includes(refreshToken)) {
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accToken = genarateAccToken({ name: user.name })
    })
});

app.delete('/logout', (req, res) => {
    RefreshToken=RefreshToken.filter(token => token !== req.body.token);
    res.sendStatus(204);
})

app.post('/log', (req, res) => {

    const userName = req.body.uName;

    const user = { name: userName }

    const token = genarateAccToken(user);

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    RefreshToken.push(refreshToken);

    res.json({ accs: token, refreshToken: refreshToken });
});

// token verification middleware
// function authenticatedToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == nul) {
//         return res.sendStatus(401);
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) { return res.sendStatus(403); }
//         req.user = user;
//         next()
//     })
// }

function genarateAccToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })

}

const port = (4501);

app.listen(port, () => {
    console.log(port);
});

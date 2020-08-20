# installation to server
    1-> install node
    2-> npm init
    3-> npm install express --save mysql body-parser jsonwebtoken dotenv  
    4-> for dev use nodemon (npm i -g nodemon)
    5-> for production use pm2 (https://pm2.keymetrics.io/docs/usage/startup/) 

# 
    ->create .env file for variables
    ->import jsonwebtoken 
    const jwt = require('jsonwebtoken');
    ->import dotenv
    require('dotenv').config();
    ->get token
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    user = user data,
    process.env.ACCESS_TOKEN_SECRET= secret access code





* create random key 
	require(‘crypto’).randomBytes(64).toString(‘hex’)

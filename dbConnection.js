const mysql = require('mysql');

const mySqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passw0rd',
    database: 'pos'
});

mySqlConnection.connect((err) => {
    if (!err) {
        console.log(" Server Connected");
    } else {
        console.log("server Connection error");
    }
});

module.exports = mySqlConnection;

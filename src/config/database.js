const mysql = require('mysql');
const config = require('./config');
//To find out more on createPool:
//https://www.npmjs.com/package/mysql#pooling-connections

const pool = mysql.createPool({
        connectionLimit: 100,
        host: 'esdca2instance.cq3hja5zqss3.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'mallvin29',
        database: 'esdca2',
        multipleStatements: true
    });

 module.exports=pool;
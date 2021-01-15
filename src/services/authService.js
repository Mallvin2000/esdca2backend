config = require('../config/config');
const pool = require('../config/database');
const winston = require('winston');
const path = require('path');

//create logger
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.printf(info => `${info.message}`),
    transports: [
      new winston.transports.File({
        filename: path.join(__dirname, 'data.log'),
        level: 'error'//,
       // maxsize: 500
      })
    ]
  });

  //use logging example in this function to be able to check logs for suspicious log in attempts
module.exports.authenticate = (email) => {
    return new Promise((resolve, reject) => {
        console.log("promise created");
        pool.getConnection((err, connection) => {
            if (err) {
                logger.error(new Date() + " " + err);
                reject("Server Error");
            } else {
                //changed this example to parameterised as the login page is vulnerable to SQL injection to retreive user data and table name
                    /* connection.query(`SELECT user.user_id, fullname, email, user_password, role_name, user.role_id  
                   FROM user INNER JOIN role ON user.role_id=role.role_id AND email='${email}'`, {}, (err, rows) => { */
                    connection.query(`SELECT user.user_id, fullname, email, user_password, role_name, user.role_id  
                    FROM user INNER JOIN role ON user.role_id=role.role_id AND email= ?`, [email], (err, rows) => {
                        if (err) {
                            logger.error(new Date() + " " + err);
                            reject("Server Error");

                        } else {
                            if (rows.length == 1) {
                                //console.log(rows);
                                //console.log("returning result");
                                resolve(rows);

                            } else {

                                //return callback('Login has failed', null);
                                //console.log("login failed");
                                reject('Login has failed');
                            }
                        }
                        connection.release();

                    });
            }
        }); //End of getConnection
    });//End of promise 
        

    } //End of authenticate
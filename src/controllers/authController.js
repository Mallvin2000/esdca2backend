const user = require('../services/userService');
const auth = require('../services/authService');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const jwt = require('jsonwebtoken');



exports.processLogin = async (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    try {
        let results = await auth.authenticate(email);
        if (results) {
            //console.log("there is a result");
            if (results.length == 1) {
                if ((password == null) || (results[0] == null)) {
                    return res.status(500).json({ "error": 'login failed', "code":500 });
                }
                if (bcrypt.compareSync(password, results[0].user_password) == true) {
                    //console.log('SUCCESS');
                    let data = {
                        user_id: results[0].user_id,
                        role_name: results[0].role_name,
                        token: jwt.sign({ id: results[0].user_id, role_name: results[0].role_name }, config.JWTKey, {
                            expiresIn: 86400 //Expires in 24 hrs
                        })
                    }; //End of data variable setup

                    return res.status(200).json(data);
                } else {
                    // return res.status(500).json({ message: 'Login has failed.' });
                    return res.status(500).json({ "error":"Incorrect Password", "code":500});
                } //End of passowrd comparison with the retrieved decoded password.
            } //End of checking if there are returned SQL results
        }
    } catch (error) {
        
        return res.status(500).json({ "error": "Internal Server Error", "code": 500 });
    } //end of try
};

// If user submitted data, run the code in below
exports.processRegister = (req, res, next) => {
    console.log('processRegister running');
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = req.body.password;


    bcrypt.hash(password, 10, async(err, hash) => {
        if (err) {
            console.log('Error on hashing password');
            return res.status(500).json({ "error": 'Unable to complete registration', "code": 500 });
        } else {
            try {
                results = await user.createUser(fullName, email, hash);
                console.log(results);
                return res.status(200).json({ message: 'Completed registration' });
            } catch (error) {
                console.log('processRegister method : catch block section code is running');
                console.log(error, '=======================================================================');
                return res.status(500).json({ "error": 'Unable to complete registration', "code":500 });
            }
        }
    });


}; //End of processRegister
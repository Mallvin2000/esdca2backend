var jwt = require('jsonwebtoken');
var config = require('../config/config');


var verifyFn = {

    verifyAdmin: function (req, res, next) {
        console.log("Checking if admin");
        var token = req.headers['authorization'];
        console.log(token);
        res.type('json');
        if (!token || !token.includes("Bearer ")) {
            console.log("No token detected");
            res.status(403);
            res.send(`{"Message":"Not Authorized"}`);

        } else {
            //token = token.split('Bearer ')[1]; //obtain the token’s value
            token=token.substring(7);
            jwt.verify(token,config.JWTKey,function(err,decoded){
                if(err){//key invalid
                    res.status(403);
                    res.send(`{"Message":"Not Authorized"}`);
                }else{
                    req.user_id=decoded.user_id;
                    req.role_name=decoded.role_name;
                    console.log(decoded.role_name);

                    if (decoded.role_name == 'admin') {
                        next();
                    } else {
                        res.status(403);
                        res.send(`{"Message":"You are not an admin"}`);
                    }            
                }

            });
        }

    }
}

module.exports=verifyFn;
var token = req.headers['authorization'];
//console.log(token);
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

            next();          
        }

    });
}
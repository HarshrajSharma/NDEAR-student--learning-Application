function verifyToken(req,res,next){
    let token=req.headers['authorization'];
    if(token){
        token=token.split(" ")[1];
        jwt.verify(token,process.env.JWTPRIVATEKEY),(err,valid)=>{
            if(err){
                res.send("please provide valid token")
            }else{
                next();
            }
        }
        
    }else{
        res.send("Please provide a valid token.")
    }
    next()
}

module.exports=verifyToken;
const jwt=require ("jsonwebtoken");

 function auth(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.json({
            message:"authorize denied"
        })
    }
    const token=authHeader.split(" ")[1];
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error);
        res.json({
            message:"Invalid token"
        })
    }
}

module.exports=auth;
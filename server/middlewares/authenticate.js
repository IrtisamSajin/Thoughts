const { verifyToken } = require("../Helpers/tokens");

function authenticate(req,res,next){
    try{
        const verified=verifyToken(req.headers['authorization'].split(" ")[1]);
        req.userID=verified.userID;
        next();
    }catch(err){
        res.status(404).json({error:"Login Required"});
    }
}

module.exports=authenticate;
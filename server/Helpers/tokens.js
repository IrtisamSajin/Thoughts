const jwt=require('jsonwebtoken')

function getToken(payload){
    const token=jwt.sign(payload,process.env.SECRET_KEY);
    return token;
}

function verifyToken(token){
    try{
        const verified=jwt.verify(token,process.env.SECRET_KEY);
        return verified;
    }catch(err){
        throw new Error("Invalid Token");
    }
}

module.exports={getToken,verifyToken};
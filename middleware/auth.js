const config = require('config');
const jwt = require('jsonwebtoken');

function auth (req,res,next){
    const token = req.headers['auth-token'];

    if(!token){
        res.status(401).json({msg:'access denied bro'});
        return;
    }
    try{
        const verified = jwt.verify(token,config.get('jwtSecret'));
        req.user = verified;
    } 
    catch(err){
        res.send(400).json({msg:'error aa gyi bhai'});
    }
    next();
}


module.exports = auth;
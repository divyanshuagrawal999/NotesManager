var jwt = require('jsonwebtoken');
const JWT_SECRET = 'divisagoodboy';

const fetchUser = (req, res, next)=>{            //next denotes the async funciton
    //get the user form the jwt token and add id to req object
    const token = req.header('auth-token');      //I put the name of header as authtoken
    //if token is not available
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "please authenticate using a valid token"})
    }
        
}
module.exports = fetchUser;
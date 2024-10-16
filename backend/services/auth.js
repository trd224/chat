const jwt = require("jsonwebtoken");

function setUser(user){
    try{
        const payload = {
            _id: user._id,
            email: user.email
        }
        return jwt.sign(payload, process.env.SECRET);
    }
    catch(err){
        return null;
    }
    
}

function getUser(token){
    try{
        return jwt.verify(token, process.env.SECRET);
    }
    catch(err){
        return null;
    }
    
}

module.exports = {setUser, getUser}
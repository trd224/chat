const jwt = require("jsonwebtoken");
const { SECRET } = require('../configs/envConfig');

function setUser(user){
    try{
        const payload = {
            _id: user._id,
            email: user.email
        }
        return jwt.sign(payload, SECRET);
    }
    catch(err){
        return null;
    }
    
}

function getUser(token){
    try{
        return jwt.verify(token, SECRET);
    }
    catch(err){
        return null;
    }
    
}

module.exports = {setUser, getUser}
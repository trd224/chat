const { getUser } = require("../services/auth");

function authenticate(req, res, next){
    req.currentUserId = null;
    const authorizationHeaderValue = req.headers['authorization'];

    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
        return res.status(401).json({"message": "unauthorized"});
    }

    const token = authorizationHeaderValue.split(" ")[1];
    if(!token) return res.status(401).json({"message": "unauthorized"});

    const user = getUser(token);
    if(!user) return res.status(401).json({"message": "unauthorized"});

    req.currentUserId = user._id;
    console.log("AAAAAAb", req.currentUserId)
    next();
}

module.exports = {authenticate};
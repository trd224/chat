const { getUser } = require("../services/auth");

function authenticate(req, res, next){
    req.currentUserId = null;
    const authorizationHeaderValue = req.headers['authorization'];
    //console.log(authorizationHeaderValue);
    //console.log(authorizationHeaderValue.startsWith("Bearer"));

    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
        return res.status(401).json({"message": "unauthorized"});
    }

    const token = authorizationHeaderValue.split(" ")[1];
    if(!token) return res.status(401).json({"message": "unauthorized"});

    //console.log(token);

    const user = getUser(token);
    if(!user) return res.status(401).json({"message": "unauthorized"});

    //req.user = user;
    req.currentUserId = user._id;
    //console.log(req.currentUserId)

    next();
}

module.exports = {authenticate};
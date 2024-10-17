const User = require("../models/user");

const {setUser} = require("../services/auth");


async function userSignUp(req, res){
    try{
        const {mobile, email, password} = req.body;
        const user = await User.findOne({$or: [{mobile},{email}]});
        if(user) return res.status(409).json({message: "User already exist"});
        await User.create(req.body);
        return res.status(201).json({message: "User created"});
    }
    catch(err){
        return res.status(500).json({error: err})
    }
}



async function userLogin(req, res){
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email, password});
        if(!user) return res.status(404).json({message: "User not found"})
        const token = setUser(user);
        return res.status(200).json({email: email, token: token});
    }
    catch(err){
        return res.status(500).json({ error: err });
    }

}



async function getAllUsers(req, res){
    try{

         const users = await User.find({});
         return res.status(200).json(users);
    }
    catch(err){
         return res.status(500).json({ error: err });
    }
 }

 async function getCurrentUsers(req, res){
    try{

         const users = await User.find({_id: req.currentUserId});
         return res.status(200).json(users);
    }
    catch(err){
         return res.status(500).json({ error: err });
    }
 }



async function getUserById(req, res){
    const id = req.params.id;
   
    try{
        if(id === req.currentUserId){
            const user = await User.findOne({_id: id});
            return res.status(200).json(user);
        }
        return res.status(404).json({message: "Not found"});
        
    }
    catch(err){
        return res.status(500).json({ error: err });
    }
}



module.exports = {userSignUp, userLogin, getAllUsers, getCurrentUsers, getUserById}
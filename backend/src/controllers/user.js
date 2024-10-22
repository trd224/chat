const User = require("../models/user");

const {setUser} = require("../services/auth");


async function userSignUp(req, res){
    try{
        const {mobile, userName} = req.body;
        const user = await User.findOne({$or: [{mobile},{userName}]});
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
        const {userName, password} = req.body;
        const user = await User.findOne({userName, password});
        if(!user) return res.status(404).json({message: "User not found"})
        const token = setUser(user);
        return res.status(200).json({userName: userName, token: token});
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

 async function getCurrentUser(req, res){
    try{

         const user = await User.findOne({_id: req.currentUserId},{ password: 0});
         return res.status(200).json(user);
    }
    catch(err){
         return res.status(500).json({ error: err });
    }
 }



async function getUserById(req, res){
    const id = req.params.id;
   
    // try{
    //     if(id === req.currentUserId){
    //         const user = await User.findOne({_id: id});
    //         return res.status(200).json(user);
    //     }
    //     return res.status(404).json({message: "Not found"});
        
    // }
    // catch(err){
    //     return res.status(500).json({ error: err });
    // }

    try{
        const user = await User.findOne({_id: id},{ password: 0});
        if(user){
            return res.status(200).json(user);
        }
        return res.status(404).json({message: "Not found"});
        
    }
    catch(err){
        return res.status(500).json({ error: err });
    }
}



module.exports = {userSignUp, userLogin, getAllUsers, getCurrentUser, getUserById}
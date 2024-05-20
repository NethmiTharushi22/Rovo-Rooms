const express = require('express');
const router =express.Router();

const User =require("../models/user");

router.post('/register',async (req,res) => {
    const {name,email,password} = req.body;
    const newUser = new User({
        name,
        email,
        password
    });
    try{
        const result = await newUser.save();
        res.json(result);
    }catch(err){
        res.json(err);

    }

});
router.post("/login",async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            if(user.password === password){
                res.json(user);
            }else{
                res.json({message:"password is wrong"});
            }
        }else{
            res.json({message:"user not found"});
        }
    }catch(err){
        res.json(err);
    }
});
router.get("/getallusers",async (req,res) => {
    try {
        const users = await User.find()
        res.send(users);
    } catch (error) {
        return res.status(404).json({message});
    }
})
module.exports =router;
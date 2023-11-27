const express=require('express');
const validator=require('validator');
const bcrypt=require('bcrypt')
const User=require('../Models/usersModel');
const { getToken } = require('../Helpers/tokens');

const router=express.Router();


router.post('/',async (req,res) => {
    try{
        const { fullName, email, password,thoughts } = req.body;

        if (!validator.isEmail(email)) {
            throw new Error("Invalid email" );
        }

        if (!validator.isLength(password, { min: 8 })) {
            throw new Error("Password is too short");
        }


        const user=await User.findOne({email:email});
        if(user){
            let message="Email already in use";
            res
            .status(409)
            .setHeader('Access-Control-Expose-Headers', 'Authorization')
            .json({message});
        }else{
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const newUser = new User({
              fullName: fullName,
              email: email,
              password: hashedPassword,
              thoughts: thoughts
            });

            const token = getToken({ userID: newUser._id.toString() });
            await newUser.save();
            res
              .status(200)
              .header("Authorization", `Bearer ${token}`)
              .setHeader('Access-Control-Expose-Headers', 'Authorization')
              .json({});
        }

    }catch(err){
        const message=err.message;
        if(!res.headersSent)res.status(500).json({message});
    }
})

module.exports=router;
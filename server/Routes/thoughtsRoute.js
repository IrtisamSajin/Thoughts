const express=require('express');
const mongoose = require('mongoose');
const User = require('../Models/usersModel');
const {updateThoughts,getThoughts} = require('../Helpers/funcThoughts');

const router=express.Router();

router.get('/',async (req,res) => {
    try{
        const userResponse=await getThoughts(req.userID)
        res.status(200).json(userResponse);
    }catch(err){
        console.log(err)
        res.status(404).json({error:"Server Error"})
    }    
})

router.post('/',async (req,res) => {
    try{
        const updatedThoughts=req.body;
        await updateThoughts(req.userID,updatedThoughts);
        res.status(200).json("Sucess");
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Server Error"})
    }
})

router.patch('/',async (req,res) => {
    try{
        await updateThoughts(req.userID,req.body.thoughts);
        res.status(200);
    }catch(error){
        res.status(500).json({error:"Server Error"})
    }
})

router.delete('/',async (req,res) => {
    try{
        await updateThoughts(req.userID,req.body.thoughts);
        res.status(200);
    }catch(error){
        res.status(500).json({error:"Server Error"})
    }
})



module.exports=router;
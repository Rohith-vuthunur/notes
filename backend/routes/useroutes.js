    const express = require("express")

    const router = express.Router()
    const User = require('../models/usermodel')
    router.get('/',async (req,res)=>{
        try{
            const showall = await User.find()
            res.status(201).json(showall)
        }
        catch(err){
            res.status(500).send()
        }
    })
    router.post("/",async (req,res)=>{
        console.log("Request body:", req.body);
        const {name,email,age} = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User with this email already exists" });
        }
    try{ const userdata  = await User.create({
            name : name,
            email : email,
            age : age
            
        })
        res.status(200).json(userdata)
    }
        catch(err){
            res.status(400).json(err)
        }
    })
    router.get("/:id",async(req,res)=>{
        const {id} = req.params
        try{
            const user = await User.findById({_id:id})
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).send(err)
        }
    })
    router.patch("/:id",async(req,res)=>{
        const {id} = req.params
        const {name,age,email} = req.body
        try{
            const up  = await User.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(up)
        }
        catch(err){
            res.status(400).send(err);
        }
    })
    router.delete("/:id",async(req,res)=>{
        const {id} = req.params
        try{
            const del = await User.findByIdAndDelete({_id:id})
            res.status(200).json("successfully deleted")
        }
        catch(err){
            res.status(400).json(err)
        }

    })
    module.exports = router
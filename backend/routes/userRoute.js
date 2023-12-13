
const express = require('express');
const router = express.Router();

const User = require("../models/userModel");


// create request
router.post("/", async (req, res) => {

    try{
        const {name,email,age} = req.body;

        const userData = await User.create({
            name,email,age
        });

        res.status(201).json({
            message: 'User created successfully',
            userData: userData
        });

    }
    catch(err){
        res.status(400).json({
            message: 'Error in creating user again check name and email '
        });
    }
});

// get
router.get("/", async (req, res) => {

    try{
        const data = await User.find();

        res.status(201).json({
            message: 'User detched successfully',
            userDatas: data
        });
    }
    catch(err){
        res.status(400).json({
            message: 'Error in fetching user',
        });
    }
});

// get single user
router.get("/:id", async (req, res) => {

    const {id} = req.params;

    try{
        const data = await User.findById({_id: id});

        res.status(201).json({
            message: 'single User detched successfully',
            userDatas: data
        });

    }
    catch(err){
        res.status(400).json({
            message: 'Error in fetching single user',
        });
    }
});


// delete user
router.delete("/:id", async (req, res) => {

    const {id} = req.params;

    try{
        const data = await User.findByIdAndDelete({_id: id});

        res.status(201).json({
            message: 'single User deleted successfully',
            userDatas: data
        });

    }
    catch(err){
        res.status(400).json({
            message: 'Error in deleting single user',
        });
    }
});

// update user
router.patch("/:id", async (req, res) => {

    const {id} = req.params;
    const {name,email,age} = req.body;

    try{
        const data = await User.findByIdAndUpdate(id, req.body, {new:true});

        res.status(201).json({
            message: 'single User updated successfully',
            userDatas: data
        });

    }
    catch(err){
        res.status(400).json({
            message: 'Error in update single user',
        });
    }
});

module.exports = router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const registerUser = asyncHandler( async (req, res) => {

    if(!req.body){ 
        res.status(400);
        throw new Error('Bad request');
    }
    const { username, startingBudget, password } = req.body;

    if(!username || !startingBudget || !password){
        res.status(400);
        throw new Error('Missing username or password');
    }

    const userExists = await User.findOne({username});
    if(userExists){
        res.status(400, {message: 'Username is taken'});
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
        startingBudget,
    });

    if(user){
        res.status(201).json({
            message: 'User registered',
            data: {
                _id: user.id,
                username: user.username,
                startingBudget: user.startingBudget,
                token: generateToken(user._id),
            }
        })
    } else{
        res.status(400);
        throw new Error('Invalid user data');
    }

});

const loginUser = asyncHandler( async (req, res) => {
    const { username, password } = req.body;

    const  user = await User.findOne({ username: username });
    
    const hashedPassword = await bcrypt.compare(password, user.password);
    
    if( user && hashedPassword){
        res.json({
            _id: user.id,
            username: user.username,
            startingBudget: user.startingBudget,
            token: generateToken(user._id)
        })
    } else {
        throw new Error('Invalid credentials');
    }
});

const getUser = asyncHandler( async (req, res) => {
    const { _id, username, startingBudget } = await User.findById(req.body.id);
    console.log(req);

    res.status(200).json({
        id: _id,
        username,
        startingBudget,
    })
});

const deleteUser = asyncHandler( async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if(!user){
        res.status(400).json({
            message: 'User could not be found',
        })
    }

    res.status(200).json({
        message: 'User removed',
        user: user,
    })
});

module.exports = {
    registerUser,
    loginUser,
    getUser,
    deleteUser
}
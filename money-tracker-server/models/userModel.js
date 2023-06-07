const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type:String,
            required: [true, 'Please enter a user name']
        },
        password: {
            type: String,
            required: [true, 'Please enter a password']
        },
        startingBudget: {
            type: Number,
            required: [true, 'Please enter a starting budget']
        },
    },
    {
        timestamp: true,
        bufferCommands: false,
        autoCreate: false
    } 
);

module.exports = mongoose.model('User', userSchema);
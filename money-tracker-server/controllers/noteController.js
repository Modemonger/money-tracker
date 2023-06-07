const asyncHandler = require('express-async-handler');

const Note = require('../models/notesModel');
const User = require('../models/userModel');

const getTotal = (notes) => {
    const total = notes?.reduce( function(a, b){
        return a + Number(b['total']);
    }, 0);
    return Math.round(total * 100) / 100;
}

const getNotes = asyncHandler ( async (req, res) => {
    console.log(req.user.id);
    let notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
})

const getUserTotal = asyncHandler ( async (req, res) => {
    console.log(req.user.id);
    const user = await User.findById(req.user.id);
    const notes = await Note.find({ user: req.user.id });
    const budget = getTotal(notes) + user.startingBudget;
    console.log(budget)
    res.status(200).json(budget);
})

const setNote = asyncHandler ( async (req, res) => {
    console.log(req.body)
    if(!req.body.date){
        res.status(400);
        throw new Error('Please fill in the date field');
    }

    const note = await Note.create({
        spent: req.body.spent,
        gained: req.body.gained,
        total: req.body.total,
        date: req.body.date,
        description: req.body.description,
        user: req.user
    })

    res.status(200).json(note);
})

const updateNote = asyncHandler ( async (req, res) => {

    const note = await Note.findById(req.params.id);

    if(!note){

        res.status(400)
        throw new Error('Not found');

    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    if(note.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    const updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updateNote);
})

const deleteNote= asyncHandler ( async (req, res) => {
    const note = await Note.findById(req.query.id);

    if(!note){
        res.status(400)
        throw new Error('Not found');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    if(note.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    await Note.deleteOne({ _id: note._id});

    res.status(200).json(note);
})

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote,
    getUserTotal,
}
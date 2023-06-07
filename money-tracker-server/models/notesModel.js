const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        spent: {
            type: Number,
        },
        gained: {
            type: Number,
        },
        total: {
            type: Number,
        },
        date: {
            type: Date,
            required: [true, 'Please select a date'],
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Note', noteSchema);
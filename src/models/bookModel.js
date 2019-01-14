const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    author: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    },

    avaliable: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', schema);
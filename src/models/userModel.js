const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    },

    bookcard: {
        type: String,
        required: true,
        unique: true,

    },

    active: {
        type: Boolean,
        default: true,
    },

    admin: {
        type: Boolean,
        default: false,
    },

    books: {
        book: {
            _id: {
                type: String,
            },

            name: {
                type: String,
            },

            author: {
                type: String,
            },

            category: {
                type: String,
            },
        },
    },

    holdingBook: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('User', schema);
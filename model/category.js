const mongoose = require('mongoose');
const productSchema = require('./productSchema');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    slug: {
        type: String,
        required: true,
        unique: true
    },

}, 
    {timestamps: true}
);



module.exports = mongoose.model('Category', categorySchema);
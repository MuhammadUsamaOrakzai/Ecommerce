const mongoose = require('mongoose');
const categorySchema = require('./category');



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, 
    {timestamps: true}

);


module.exports = mongoose.model('Product', productSchema);
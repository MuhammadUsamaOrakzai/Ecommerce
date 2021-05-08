const mongoose  = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        min: 5
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'admin',
        enum: ["user", "admin"]
    }
});


module.exports = mongoose.model('Admin', adminSchema);
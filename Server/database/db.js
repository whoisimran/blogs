const mongoose = require('mongoose');

let student = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }

});

const Students = mongoose.model("users", student);

module.exports = Students;
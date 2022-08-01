const mongoose = require('mongoose');

let comment = new mongoose.Schema({
   
    comment:{
        type: String,
        required: true
    },
    b_Id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }

});

const comments = mongoose.model("comments", comment);

module.exports = comments;
const mongoose = require('mongoose');

let image = new mongoose.Schema({
    a_Id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
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

const images = mongoose.model("images", image);

module.exports = images;
const mongoose = require('mongoose');

let blog = new mongoose.Schema({
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

const blogs = mongoose.model("blogs", blog);

module.exports = blogs;
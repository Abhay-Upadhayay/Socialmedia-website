const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    media : {
        type : String,
        required : true
    },
    caption : {
        type : String,
        // required : true
    }
}, {timestemp : true})

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
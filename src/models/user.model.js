const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username : {
        type: String,
        required : true,
        minLength: 1,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: "https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80"
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
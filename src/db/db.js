
const mongoose = require('mongoose');
const config = require('../config/config.js')

const connect = ()=>{
    mongoose.connect(config.DB_CONNECTION_STRING)
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = connect;
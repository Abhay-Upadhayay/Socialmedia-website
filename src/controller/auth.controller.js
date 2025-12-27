const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userModel = require('../models/user.model')
const postModel = require('../models/post.model') 

module.exports.indexController = async (req,res)=>{
    try{
        let token = req.cookies.token

        let user = null
        if(token){
            let decoded = jwt.verify(token,config.JWT_SECRET);
            user = await userModel.findById(decoded.id);
        }

        const postData = await postModel.find().populate("author", "username avatar")

        

        res.render('home', {user , postData})
    }catch(err){
        console.log(err);
        res.status(500).json({message: "internal server error ", error : err.message})
    }
}
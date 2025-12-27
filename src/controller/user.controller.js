const userModel = require('../models/user.model');
const postModel = require('../models/post.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const imagekit = require('../services/imagekit.service');



module.exports.getRegisteController = (req,res)=>{
    res.render("register");
}

module.exports.postRegisterController = async (req,res)=>{
    try{
        let {username,email,password} = req.body;

        if(!username){
            return res.render("register" , { error : "Username is required"});
        }
        if(!email){
            return res.render("register" , { error : "Email is required"});
        }
        if(!password){
            return res.render("register" , { error : "Password is required"});
        }
        
        let user = await userModel.findOne({email});
        
        if(user){
            return res.render("register" , { error : "User already exist"});

        }

        let hashedPassword = await bcrypt.hash(password,10);
    
        user = await userModel.create({
            username,
            email,
            password : hashedPassword
        })


        req.flash("success" , "User registered successfully");
        return res.redirect("/user/login");
        
        
        
        
    }catch(err){
        console.log('failed to register user...',err );
        res.status(500).json({message: "internal server error ", error : err.message})
    }
}

module.exports.getLoginController = (req,res)=>{
 
    res.render("login");
}

module.exports.postLoginController = async (req,res) =>{
    try {
        const {email , password} = req.body;

        if(!email){
            return res.render("login" , {error : "Email is required"});
        }


        if(!password){
            return res.render("login" , {error : "Password is required"});
        }

        let user = await userModel.findOne({email});

        if(!user){
            return res.render("login", {error : "Invalid credentials"})
        }


        let isMatch = await bcrypt.compare(password , user.password );
    
        if(!isMatch){
            return res.render("login", {error : "Invalid credentials"})
        }

        let token = jwt.sign({
            id : user._id,
            email : user.email
        }, config.JWT_SECRET);


        req.flash('success' , "Login successfull");

        res.cookie("token", token,{
            httpOnly : true,
            secure : false,
        })


        res.redirect('/');
    } catch (err) {
        console.log('failed to register user...',err );
        res.status(500).json({message: "internal server error ", error : err.message})
    }
}


module.exports.getLogoutController = (req,res)=>{
    try{
        res.clearCookie("token")
        res.redirect("/user/login")
    }catch(err){
        console.log(err);
        res.status(500).json({message: "internal server error ", error : err.message})
    }
}


module.exports.getProfileController = async (req,res) => {
    try{
        const userId = req.userId

        const user = await userModel.findById(userId).select("-password")

        const userPosts = await postModel.find({author : userId}).populate("author" , "username avatar")
       

        res.render('userProfile' , {user , userPosts})
    }catch(err){
        console.log(err);
        res.status(500).json({message: "internal server error ", error : err.message})
    }
}


module.exports.getEditProfileController = (req,res) => {
    try {
        
        res.render('editProfile')
    } catch (error) {
        console.log(error);
        req.flash("error", error.message);
        res.redirect("/");
    }
}

module.exports.postEditProfileController = async (req,res) => {
    try {
        
        
        let media = req.file
        
        if(!media){
            req.flash("error", "Please select an image")
            return res.redirect('/user/editProfile')
        }
        const userId = req.userId
        const {username} = req.body

        const user = await userModel.findById(userId);
        
        let nickName = username;

        if(!username){
            nickName = user.username;
        }


        const result = await imagekit.upload({
          file: media.buffer,
          fileName: media.originalname,
          isPrivateFile: false,
          isPublished: true,
        });

        let profileURL = result.url

        await userModel.findByIdAndUpdate(userId,{
            username : nickName,
            avatar : profileURL
        })

        req.flash("sucess", "Profile updated successfuly")

        res.redirect('/user/profile')


    } catch (error) {
        console.log(error);
        req.flash("error", error.message);
        res.redirect("/");
    }
}
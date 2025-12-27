const imagekit = require("../services/imagekit.service")
const {captionGenrator} = require('../services/aicaption.service')
const postModel = require("../models/post.model")
const mongoose = require('mongoose');



module.exports.getCreatePostController = async (req, res) => {
    try {
        
        res.render("createPost")

    } catch (error) {
        req.flass("error", error.message)
        res.redirect("/user/login")
    }
}

module.exports.postCreatePostController = async (req , res) => {
    try {
        let media = req.file

        if(!media){
            req.flash("error", "Please select an Image");
            return res.redirect("/post/createpost")
        }
       
        const authorId = req.userId
        
        const result = await  imagekit.upload({
            file : media.buffer,
            fileName : media.originalname,
            isPrivateFile : false,
            isPublished : true
        })


        let mediaUrl = result.url

        let caption = await captionGenrator(media.buffer);
        
        const post = await postModel.create({
            author : authorId,
            media : mediaUrl,
            caption : caption
        })

        req.flash("success", "post created successully")
        res.redirect("/")
    } catch (error) {
        req.flash("error", error.message)
        res.redirect("/user/login")
    }
}

module.exports.deletePostController = async (req,res) => {
    try {
        const postId = req.params.postId
        let userId = req.userId;

        const post = await postModel.findById(postId)


        userId = new mongoose.Types.ObjectId(userId);
        const authorId = post.author
        
        
        
        if(userId.toString() !== authorId.toString()){
            req.flash("error" , "You are not an authorized person");
            return res.redirect('/');
        }

        await postModel.findByIdAndDelete(postId);

        req.flash("success" , "Post deleted successfully")
        res.redirect('/user/profile')

    } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "internal server error ", error: err.message });
    }
}

module.exports.getUpdateController = async (req,res) =>{
    try {
        const postId = req.params.postId;

        
        const post = await postModel.findById(postId);

        res.render('updatePost', {post});
    } catch (error) {
        console.log(error);
        req.flash("error", error.message);
        res.redirect("/user/login");
    }
}


module.exports.postUpdateController = async (req,res)=>{
    try {
        const postId = req.params.postId;
        let userId = req.userId;

        const post = await postModel.findById(postId);

        userId = new mongoose.Types.ObjectId(userId);
        const authorId = post.author;

        if (userId.toString() !== authorId.toString()) {
          req.flash("error", "You are not an authorized person");
          return res.redirect("/");
        }

        const {caption} = req.body

        
        await postModel.findByIdAndUpdate(postId , {
            caption : caption
        });

        req.flash("success", "Post Updated Successfully")

        res.redirect('/user/profile');

        
    } catch (error) {
        console.log(error);
        req.flash("error", error.message);
        res.redirect("/user/login");
    }
}
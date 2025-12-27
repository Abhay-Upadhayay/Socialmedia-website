const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const config = require("../config/config")

module.exports.protectedRoute = async (req , res , next) => {
    try {
        
       const token = req.cookies.token
       if(!token){
        
        return res.redirect("/user/login")
       }

      const decoded =  jwt.verify(token , config.JWT_SECRET)

      const user =  await userModel.findById(decoded.id)

      if(!user){
        return res.redirect("/user/login")
      }

      req.userId = decoded.id

      next()

    } catch (error) {
        return res.redirect("login", {error : error.message})
    }
}
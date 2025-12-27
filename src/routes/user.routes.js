const express = require('express');
const userController = require('../controller/user.controller')
const {protectedRoute} = require('../middleware/protected');
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage : storage});

const router = express.Router();


router.get('/',(req,res)=>{
    res.send("user")
})

router.get('/login', userController.getLoginController );

router.post('/login', userController.postLoginController);

router.post('/register', userController.postRegisterController);

router.get('/register', userController.getRegisteController);

router.get('/logout',protectedRoute, userController.getLogoutController);

router.get('/profile',protectedRoute, userController.getProfileController);

router.get('/editProfile',protectedRoute , userController.getEditProfileController);

router.post('/editProfile', protectedRoute, upload.single('media') , userController.postEditProfileController);


module.exports = router;
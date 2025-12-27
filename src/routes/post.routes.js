const express = require('express');
const postController = require('../controller/post.controller');
const {protectedRoute} = require('../middleware/protected');
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({storage : storage  })



const router = express.Router();

router.get('/createpost',protectedRoute, postController.getCreatePostController);

router.post('/createpost', protectedRoute , upload.single('media') , postController.postCreatePostController);

router.get('/delete/:postId' , protectedRoute , postController.deletePostController );

router.get('/update/:postId', protectedRoute, postController.getUpdateController);

router.post('/update/:postId', protectedRoute, postController.postUpdateController);

module.exports = router;
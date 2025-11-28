const express=require("express");
const auth=require('../middlewares/authMiddlewares.js');
const {createPost,getPosts,getPost,updatePost,deletePost}=require('../countrollers/blogController.js');
const upload = require("../config/multer.js");

const router=express.Router();


router.post('/',auth,upload.single('image'),createPost);

router.patch('/:id',auth,upload.single('image'),updatePost);

router.delete('/:id',auth,deletePost);

router.get('/:id',getPost);

router.get('/',getPosts);


module.exports=router
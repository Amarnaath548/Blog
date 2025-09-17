const express=require("express");
const upload=require('../middlewares/upload.js')
const auth=require('../middlewares/authMiddlewares.js');
const {createPost,getPosts,getPost,updatePost,deletePost}=require('../countrollers/blogController.js');

const router=express.Router();


router.post('/',auth,upload.single('image'),createPost);

router.post('/:id',auth,upload.single('image'),updatePost);

router.get('/',getPosts);

router.get('/:id',getPost);

router.delete('/:id',auth,deletePost);


module.exports=router
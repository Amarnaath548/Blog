const multer=require('multer');
const {CloudinaryStorage}=require('multer-storage-cloudinary');
const cloudinary=require('../config/cloudinary.js');

const storage= new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog',
        allowed_formets: ['jpg','jpeg','png','webp'],
    },
});

const uplode = multer({storage});

module.exports=uplode;
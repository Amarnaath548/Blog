const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnespxsij',
  api_key:    process.env.CLOUDINARY_API_KEY || '412351853219318',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'T1QJgJPgHkHyu_F8Ixu-zRKEWwU',
});

module.exports=cloudinary
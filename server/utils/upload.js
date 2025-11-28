const cloudinary =require("../config/cloudinary.js");
const fs =require("fs");

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "blog",
    });

    fs.unlinkSync(file.path);

   return result.secure_url ;
  } catch (error) {
    console.error(error);
    throw new Error("Image upload failed");
  }
};

module.exports = { uploadImage };
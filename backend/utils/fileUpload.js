const cloudinary = require("cloudinary");
const CloudinaryStorage = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
   api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
   cloudinary,
   params: {
      folder: "bloggytech",
      allowed_formats: ["jpg", "png", "jpeg"],
   },
});

module.exports = storage;
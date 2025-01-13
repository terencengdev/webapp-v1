const cloudinary = require("cloudinary").v2;
require("dotenv").config();

console.log(process.env); // remove this after you've confirmed it is working

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };

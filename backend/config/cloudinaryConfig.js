import cloudinary from 'cloudinary';
const { v2: cloudinaryV2 } = cloudinary;
import dotenv from 'dotenv';
dotenv.config();

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinaryV2;

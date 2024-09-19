import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js'; // Usa la configurazione centralizzata di Cloudinary

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "annunci",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  }),
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite di 10MB
});

export default upload;

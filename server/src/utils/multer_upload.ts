import multer from 'multer';
import { v2 } from 'cloudinary';

const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img');
  },
  filename: (req, file, cb) => {
    // Generate unique filename for uploaded file
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configure multer upload middleware
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
  fileFilter: (req, file, cb) => {
    // Check file type to ensure it is an image
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true); // Accept the file
    } else {
      cb(null, false); // Reject the file upload
    }
  },
});

export const uploadImageToCloud = async (filename: string) => {
  try {
    const result = await cloudinary.uploader.upload(
      './public/img/' + filename,
      {
        folder: 'Airbean',
        resource_type: 'image',
      }
    );

    const imageUrl = result.secure_url;
    return imageUrl;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to upload image');
  }
};

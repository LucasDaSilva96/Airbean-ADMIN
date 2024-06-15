var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import multer from 'multer';
import { v2 } from 'cloudinary';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
const cloudinary = v2;
// Configure Cloudinary with API credentials from environment variables
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});
// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set destination folder for storing uploaded images
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
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true); // Accept the file
        }
        else {
            cb(null, false); // Reject the file upload
        }
    },
});
// Function to upload an image file to Cloudinary
export const uploadImageToCloud = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path.resolve('./public/img', filename);
    const resizedFilePath = path.resolve('./public/img/resized', filename);
    try {
        // Check if the file exists before resizing
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist');
        }
        // Resize image
        yield sharp(filePath)
            .resize(300, 300, { fit: 'contain' })
            .toFile(resizedFilePath);
        // Upload the specified file to Cloudinary
        const result = yield cloudinary.uploader.upload('./public/img/' + filename, // Path to the local file
        {
            folder: 'Airbean', // Folder in Cloudinary to store the image
            resource_type: 'image', // Specify resource type as image
        });
        // Clean up local files
        fs.unlinkSync(filePath);
        fs.unlinkSync(resizedFilePath);
        const imageUrl = result.secure_url; // Extract the secure URL of the uploaded image
        return imageUrl;
    }
    catch (e) {
        console.log(e);
        throw new Error('Failed to upload image'); // Throw an error if image upload fails
    }
});
//# sourceMappingURL=multer_upload.js.map
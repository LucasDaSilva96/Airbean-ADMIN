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
export const uploadImageToCloud = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary.uploader.upload('./public/img/' + filename, {
            folder: 'Airbean',
            resource_type: 'image',
        });
        const imageUrl = result.secure_url;
        return imageUrl;
    }
    catch (e) {
        throw new Error('Failed to upload image');
    }
});
//# sourceMappingURL=multer_upload.js.map
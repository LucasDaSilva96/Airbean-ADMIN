import express from 'express';
import { signUp_post, login_post, logout_get, updateUser_patch, reset_token_get, update_password_post, } from '../controllers/authController.js';
import { upload } from '../utils/multer_upload.js';
export const authRouter = express.Router(); // Create a new Express router
// GET request to log out
authRouter.get('/logout', logout_get);
// POST request to get a reset token
authRouter.post('/getToken', reset_token_get);
// POST request to sign up a new user, with image upload using multer middleware
authRouter.post('/signUp', upload.single('image'), signUp_post);
// POST request to log in a user
authRouter.post('/login', login_post);
// POST request to reset password
authRouter.post('/resetPassword', update_password_post);
// PATCH request to update user information, protected by authentication middleware and allowing image upload
authRouter.patch('/updateUser', 
// protect, // Middleware to protect route
upload.single('image'), // Multer middleware for image upload
updateUser_patch // Handler function to update user information
);
//# sourceMappingURL=authRoutes.js.map
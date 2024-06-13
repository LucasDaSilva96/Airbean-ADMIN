import express from 'express';
import {
  signUp_post,
  login_post,
  logout_get,
  updateUser_patch,
} from '../controllers/authController.js';
import { upload } from '../utils/multer_upload.js';
import { protect } from '../controllers/protectRouteController.js';
export const authRouter = express.Router();

// GET

authRouter.get('/logout', logout_get);
// POST
authRouter.post('/signUp', upload.single('image'), signUp_post);
authRouter.post('/login', login_post);

// PATCH - Protect
authRouter.patch(
  '/updateUser',
  protect,
  upload.single('image'),
  updateUser_patch
);

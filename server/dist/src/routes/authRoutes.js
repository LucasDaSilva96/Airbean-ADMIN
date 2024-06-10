import express from 'express';
import { signUp_post, login_post, logout_get, } from '../controllers/authController.js';
import { upload } from '../utils/multer_upload.js';
export const authRouter = express.Router();
// GET
authRouter.get('/logout', logout_get);
// POST
authRouter.post('/signUp', upload.single('image'), signUp_post);
authRouter.post('/login', login_post);
//# sourceMappingURL=authRoutes.js.map
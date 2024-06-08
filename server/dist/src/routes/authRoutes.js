import express from 'express';
import { signUp_get, login_get, signUp_post, login_post, logout_get, } from '../controllers/authController.js';
export const authRouter = express.Router();
// GET
authRouter.get('/signUp', signUp_get);
authRouter.get('/login', login_get);
authRouter.get('/logout', logout_get);
// POST
authRouter.post('/signUp', signUp_post);
authRouter.post('/login', login_post);
//# sourceMappingURL=authRoutes.js.map
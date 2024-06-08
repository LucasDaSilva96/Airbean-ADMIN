var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from '../model/User.js';
import { createJWT } from '../utils/create_JWT_token.js';
import { compare } from 'bcrypt-ts';
export const signUp_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Sign up successfully (GET)',
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            next(new Error(e.toLocaleLowerCase()));
        }
        else if (e instanceof Error) {
            next(new Error(e.message));
        }
    }
});
export const login_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Login successfully (GET)',
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            next(new Error(e.toLocaleLowerCase()));
        }
        else if (e instanceof Error) {
            next(new Error(e.message));
        }
    }
});
export const signUp_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, password_confirm, role, image } = req.body;
        if (!name || !email || !password || !password_confirm)
            throw new Error('Please provide name, email, password and password confirm');
        const user_doc = yield UserModel.create({
            name,
            email,
            password,
            password_confirm,
            role: role ? role : 'user',
            image: image ? image : null,
        });
        const new_user = {
            name: user_doc.name,
            role: user_doc.role,
            _id: user_doc.id,
            image: user_doc.image,
        };
        const TOKEN = yield createJWT(new_user._id);
        // 1 day in milliseconds = 1000 * 60 * 60 * 24
        res.cookie('jwt', TOKEN, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        res.status(201).json({
            status: 'success',
            message: 'Sign up successfully (POST)',
            data: new_user,
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            next(new Error(e.toLocaleLowerCase()));
        }
        else if (e instanceof Error) {
            next(new Error(e.message));
        }
    }
});
export const login_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error('Please provide email and password');
        const user_doc = yield UserModel.findOne({ email });
        if (!user_doc)
            throw new Error('No user found with the provided email');
        const correct_password = yield compare(password, user_doc.password);
        if (!correct_password)
            throw new Error('Invalid credentials');
        const TOKEN = yield createJWT(user_doc.id);
        if (!TOKEN)
            throw new Error('Failed to generate JWT');
        // 1 day in milliseconds = 1000 * 60 * 60 * 24
        res.cookie('jwt', TOKEN, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        const user = {
            name: user_doc.name,
            role: user_doc.role,
            _id: user_doc.id,
            image: user_doc.image,
        };
        res.status(200).json({
            status: 'success',
            message: 'Login successfully (POST)',
            data: user,
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            next(new Error(e.toLocaleLowerCase()));
        }
        else if (e instanceof Error) {
            next(new Error(e.message));
        }
    }
});
export const logout_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
        res.status(200).json({
            status: 'success',
            message: 'User successfully logged out',
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            next(new Error(e.toLocaleLowerCase()));
        }
        else if (e instanceof Error) {
            next(new Error(e.message));
        }
    }
});
//# sourceMappingURL=authController.js.map
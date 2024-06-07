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
        const { name, email, password, password_confirm, role } = req.body;
        if (!name || !email || !password || !password_confirm)
            throw new Error('Please provide name, email, password and password confirm');
        const user_doc = yield UserModel.create({
            name,
            email,
            password,
            password_confirm,
            role: role ? role : 'user',
        });
        const new_user = {
            name: user_doc.name,
            email: user_doc.email,
            password: user_doc.password,
            role: user_doc.role,
            _id: user_doc.id,
            created_at: user_doc.created_at,
        };
        // 1 day in milliseconds = 1000 * 60 * 60 * 24
        res.cookie('user', JSON.stringify(new_user), {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        res.status(200).json({
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
        res.status(200).json({
            status: 'success',
            message: 'Login successfully (POST)',
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
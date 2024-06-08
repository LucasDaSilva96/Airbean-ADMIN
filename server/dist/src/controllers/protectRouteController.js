var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { UserModel } from '../model/User.js';
const JWT_SECRET = process.env.JWT_SECRET;
export const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TOKEN = req.cookies.jwt;
        if (!TOKEN) {
            res.redirect('/');
            throw new Error('JWT not provided');
        }
        if (!JWT_SECRET) {
            res.redirect('/');
            throw new Error('JWT secret is undefined');
        }
        jwt.verify(TOKEN, JWT_SECRET, (err, _decodedToken) => {
            if (err)
                throw new Error(err.message);
            next();
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
export const adminOnly = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            throw new Error('Email was not provided');
        const user = yield UserModel.findOne({ email });
        if (!user)
            throw new Error('No user found with the provide email');
        if (user.role === 'user') {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized access',
            });
        }
        next();
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
//# sourceMappingURL=protectRouteController.js.map
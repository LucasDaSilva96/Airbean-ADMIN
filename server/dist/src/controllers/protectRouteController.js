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
const JWT_SECRET = process.env.JWT_SECRET; // JWT secret key from environment variables
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL; // Client base URL from environment variables
// Middleware to protect routes and authenticate users using JWT
export const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TOKEN = req.cookies.jwt; // Get JWT token from cookies
        if (!TOKEN) {
            if (CLIENT_BASE_URL) {
                res.redirect(CLIENT_BASE_URL); // Redirect to client base URL if token is not provided
            }
            throw new Error('JWT not provided, Log in first'); // Throw error if token is not provided
        }
        if (!JWT_SECRET) {
            throw new Error('JWT secret is undefined'); // Throw error if JWT secret is undefined
        }
        jwt.verify(TOKEN, JWT_SECRET, function (err, decodedToken) {
            if (err)
                throw new Error(err.message); // Throw error if token verification fails
            if (typeof decodedToken === 'object') {
                req.body.id = decodedToken.id; // Attach user ID from decoded token to request body
            }
            next(); // Proceed to the next middleware
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to authenticate the user.')); // Pass error to the next middleware
    }
});
// Middleware to restrict access to admin-only routes
export const adminOnly = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body; // Get user ID from request body
        if (!id)
            throw new Error('Id was not provided'); // Throw error if ID is not provided
        const user = yield UserModel.findById(id); // Find user by ID in the database
        if (!user)
            throw new Error('No user found with the provide email'); // Throw error if no user is found
        if (user.role === 'user') {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthorized access', // Return unauthorized status if user is not an admin
            });
        }
        next();
    }
    catch (e) {
        console.log(e);
        next(new Error('User access denied'));
    }
});
//# sourceMappingURL=protectRouteController.js.map
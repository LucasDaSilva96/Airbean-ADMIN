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
// Function to create a JWT token with given user ID
export const createJWT = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SECRET = process.env.JWT_SECRET; // Get JWT secret from environment variables
        if (!SECRET)
            throw new Error('No JWT secret provided'); // Ensure JWT secret is defined
        // Token expiration time: 1 day in seconds
        const maxAge = 1 * 24 * 60 * 60;
        // Generate JWT token with user ID payload and specified expiration
        const TOKEN = jwt.sign({ id }, SECRET, {
            expiresIn: maxAge,
        });
        // If token creation fails, throw an error
        if (!TOKEN)
            throw new Error('Failed to create JWT');
        // Return the generated JWT token
        return TOKEN;
    }
    catch (e) {
        console.log(e);
        throw new Error('Failed to create token.');
    }
});
//# sourceMappingURL=create_JWT_token.js.map
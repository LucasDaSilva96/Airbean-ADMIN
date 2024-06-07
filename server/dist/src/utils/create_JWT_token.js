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
export const createJWT = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SECRET = process.env.JWT_SECRET;
        if (!SECRET)
            throw new Error('No JWT secret provided');
        // 1 day in seconds ↓
        const maxAge = 1 * 24 * 60 * 60;
        const TOKEN = jwt.sign({ id }, SECRET, {
            expiresIn: maxAge,
        });
        if (!TOKEN)
            throw new Error('Failed to create JWT');
        return TOKEN;
    }
    catch (e) {
        if (typeof e === 'string') {
            throw new Error(e.toLocaleLowerCase());
        }
        else if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
});
//# sourceMappingURL=create_JWT_token.js.map
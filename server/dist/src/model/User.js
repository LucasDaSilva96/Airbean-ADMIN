var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import validator from 'validator';
import { genSalt, hash } from 'bcrypt-ts';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        trim: true,
        validator: [validator.isEmail, 'Please provide a valid email.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 5,
    },
    password_confirm: {
        type: String,
        required: [true, 'Confirm password'],
        select: false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    updated_at: {
        type: Date,
    },
    image: {
        type: String,
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.password && this.password_confirm) {
            const isSame = this.password === this.password_confirm;
            if (!isSame) {
                throw Error('Password and Confirm password did not match');
            }
            const salt = yield genSalt(10);
            this.password = yield hash(this.password, salt);
            this.password_confirm = '';
        }
        next();
    });
});
export const UserModel = mongoose.model('user', userSchema);
//# sourceMappingURL=User.js.map
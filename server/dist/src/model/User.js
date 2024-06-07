import mongoose from 'mongoose';
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
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 5,
    },
    password_confirm: {
        type: String,
        required: [true, 'Confirm password'],
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
});
export const UserModel = mongoose.model('user', userSchema);
//# sourceMappingURL=User.js.map
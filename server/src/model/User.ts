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
    minlength: 5,
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
    default:
      'https://res.cloudinary.com/dqx1ejydp/image/upload/f_auto,q_auto/v1/Airbean/r8fynw2bstf3ymrkr1uq',
  },
});

userSchema.pre('save', async function (next) {
  if (this.password && this.password_confirm) {
    const isSame = this.password === this.password_confirm;
    if (!isSame) {
      throw Error('Password and Confirm password did not match');
    }

    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    this.password_confirm = '';
  }
  next();
});

export const UserModel = mongoose.model('user', userSchema);

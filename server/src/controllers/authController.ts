import type { RequestHandler } from 'express';
import { UserModel } from '../model/User.js';
import { createJWT } from '../utils/create_JWT_token.js';
import { compare } from 'bcrypt-ts';
import { uploadImageToCloud } from '../utils/multer_upload.js';

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

export const signUp_post: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, password_confirm, role } = req.body;
    const image = req.file;

    if (!name || !email || !password || !password_confirm)
      throw new Error(
        'Please provide name, email, password and password confirm'
      );

    let user_doc = null;
    if (image) {
      const IMAGE = await uploadImageToCloud(image.filename);
      user_doc = await UserModel.create({
        name,
        email,
        password,
        password_confirm,
        role: role ? role : 'user',
        image: IMAGE,
      });
    } else {
      user_doc = await UserModel.create({
        name,
        email,
        password,
        password_confirm,
        role: role ? role : 'user',
      });
    }

    const new_user = {
      name: user_doc.name,
      role: user_doc.role,
      _id: user_doc.id,
      image: user_doc.image,
    };

    const TOKEN = await createJWT(new_user._id);

    // TODO: Update the origin  url
    res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);

    // 1 day in milliseconds = 1000 * 60 * 60 * 24
    // TODO Change http=true, secure=true, sameSite="strict"
    res.cookie('jwt', TOKEN, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
    });

    res.status(201).json({
      status: 'success',
      message: 'Sign up successfully (POST)',
      data: new_user,
    });
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    } else {
      next(new Error('Failed to create user'));
    }
  }
};

export const login_post: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error('Please provide email and password');

    const user_doc = await UserModel.findOne({ email });

    if (!user_doc) throw new Error('No user found with the provided email');

    const correct_password = await compare(password, user_doc.password);

    if (!correct_password) throw new Error('Invalid credentials');

    const TOKEN = await createJWT(user_doc.id);
    if (!TOKEN) throw new Error('Failed to generate JWT');

    // TODO: Update the origin  url
    res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);

    // 1 day in milliseconds = 1000 * 60 * 60 * 24
    // TODO Change http=true, secure=true, sameSite="strict"
    res.cookie('jwt', TOKEN, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
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
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    }
  }
};

export const logout_get: RequestHandler = async (_req, res, next) => {
  try {
    // TODO: Update the origin  url
    res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);

    // 1 day in milliseconds = 1000 * 60 * 60 * 24
    // TODO Change http=true, secure=true, sameSite="strict"
    res.cookie('jwt', '', {
      maxAge: 1,
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
    });

    res.status(200).json({
      status: 'success',
      message: 'User successfully logged out',
    });
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    }
  }
};

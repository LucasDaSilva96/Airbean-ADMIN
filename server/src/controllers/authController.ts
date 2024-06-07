import type { RequestHandler } from 'express';
import { UserModel } from '../model/User.js';

export const signUp_get: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Sign up successfully (GET)',
    });
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    }
  }
};

export const login_get: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Login successfully (GET)',
    });
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    }
  }
};

export const signUp_post: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, password_confirm, role } = req.body;

    if (!name || !email || !password || !password_confirm)
      throw new Error(
        'Please provide name, email, password and password confirm'
      );

    const user_doc = await UserModel.create({
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
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    }
  }
};

export const login_post: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Login successfully (POST)',
    });
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    }
  }
};

import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { UserModel } from '../model/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const protect: RequestHandler = async (req, res, next) => {
  try {
    const TOKEN: string = req.cookies.jwt;

    if (!TOKEN) {
      res.redirect('/');
      throw new Error('JWT not provided');
    }

    if (!JWT_SECRET) {
      res.redirect('/');
      throw new Error('JWT secret is undefined');
    }

    jwt.verify(TOKEN, JWT_SECRET, (err, _decodedToken) => {
      if (err) throw new Error(err.message);
      next();
    });
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    }
  }
};

export const adminOnly: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throw new Error('Email was not provided');

    const user = await UserModel.findOne({ email });

    if (!user) throw new Error('No user found with the provide email');

    if (user.role === 'user') {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized access',
      });
    }

    next();
  } catch (e) {
    if (typeof e === 'string') {
      next(new Error(e.toLocaleLowerCase()));
    } else if (e instanceof Error) {
      next(new Error(e.message));
    }
  }
};

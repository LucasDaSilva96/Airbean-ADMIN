import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { UserModel } from '../model/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

export const protect: RequestHandler = async (req, res, next) => {
  try {
    const TOKEN: string = req.cookies.jwt;

    if (!TOKEN) {
      if (CLIENT_BASE_URL) {
        res.redirect(CLIENT_BASE_URL);
      }
      throw new Error('JWT not provided, Log in first');
    }

    if (!JWT_SECRET) {
      throw new Error('JWT secret is undefined');
    }

    jwt.verify(TOKEN, JWT_SECRET, function (err, decodedToken) {
      if (err) throw new Error(err.message);
      if (typeof decodedToken === 'object') {
        req.body.id = decodedToken.id;
      }
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
    const { id } = req.body;

    if (!id) throw new Error('Id was not provided');

    const user = await UserModel.findById(id);

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

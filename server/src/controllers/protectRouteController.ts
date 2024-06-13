import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { UserModel } from '../model/User.js';

const JWT_SECRET = process.env.JWT_SECRET; // JWT secret key from environment variables

// Middleware to protect routes and authenticate users using JWT
export const protect: RequestHandler = async (req, res, next) => {
  try {
    const TOKEN: string = req.cookies.jwt; // Get JWT token from cookies

    if (!TOKEN) {
      throw new Error('JWT not provided, Log in first'); // Throw error if token is not provided
    }

    if (!JWT_SECRET) {
      throw new Error('JWT secret is undefined'); // Throw error if JWT secret is undefined
    }

    jwt.verify(TOKEN, JWT_SECRET, function (err, decodedToken) {
      if (err) throw new Error(err.message); // Throw error if token verification fails
      if (typeof decodedToken === 'object') {
        req.body.id = decodedToken.id; // Attach user ID from decoded token to request body
      }
      next(); // Proceed to the next middleware
    });
  } catch (e) {
    console.log(e);
    next(new Error('Failed to authenticate the user.')); // Pass error to the next middleware
  }
};

// Middleware to restrict access to admin-only routes
export const adminOnly: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.body; // Get user ID from request body

    if (!id) throw new Error('Id was not provided'); // Throw error if ID is not provided

    const user = await UserModel.findById(id); // Find user by ID in the database

    if (!user) throw new Error('No user found with the provide email'); // Throw error if no user is found

    if (user.role === 'user') {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized access', // Return unauthorized status if user is not an admin
      });
    }

    next();
  } catch (e) {
    console.log(e);
    next(new Error('User access denied'));
  }
};

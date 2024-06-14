import type { RequestHandler } from 'express';
import { UserModel } from '../model/User.js';
import { createJWT } from '../utils/create_JWT_token.js';
import { compare } from 'bcrypt-ts';
import { uploadImageToCloud } from '../utils/multer_upload.js';

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL; // Client base URL from environment variables

// Handler to sign up a new user
export const signUp_post: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, password_confirm, role } = req.body; // Destructure request body
    const image = req.file; // Get image file from request

    // Throw error if any field is missing
    if (!name || !email || !password || !password_confirm)
      throw new Error(
        'Please provide name, email, password and password confirm'
      );

    let user_doc = null;
    if (image) {
      const IMAGE = await uploadImageToCloud(image.filename); // Upload image to cloud
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

    const TOKEN = await createJWT(new_user._id); // Create JWT token for the user

    // Set Access-Control-Allow-Origin header
    res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);

    // const expires = new Date(Date.now() + 86400e3);
    // 1 day in milliseconds = 1000 * 60 * 60 * 24
    // TODO Change http=true, secure=true, sameSite="strict"
    // res.cookie('jwt', TOKEN, {
    //   maxAge: 1000 * 60 * 60 * 24,
    //   expires,
    //   httpOnly: false,
    //   secure: false,
    //   sameSite: 'lax',
    // });

    res.status(201).json({
      status: 'success',
      message: 'Sign up successfully (POST)',
      data: new_user,
    });
  } catch (e) {
    console.log(e);

    next(new Error('Failed to create a new user.'));
  }
};

// Handler to log in an existing user
export const login_post: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body; // Destructure request body
    if (!email || !password)
      throw new Error('Please provide email and password'); // Throw error if email or password is missing

    const user_doc = await UserModel.findOne({ email }); // Find user by email

    if (!user_doc) throw new Error('No user found with the provided email'); // Throw error if user is not found

    const correct_password = await compare(password, user_doc.password); // Compare provided password with stored password

    if (!correct_password) throw new Error('Invalid credentials'); // Throw error if passwords do not match

    const TOKEN = await createJWT(user_doc.id); // Create JWT token for the user
    if (!TOKEN) throw new Error('Failed to generate JWT'); // Throw error if token generation fails

    res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL); // Set Access-Control-Allow-Origin header

    // 1 day from now
    const expires = new Date(Date.now() + 86400e3);
    // 1 day in milliseconds = 1000 * 60 * 60 * 24

    res.cookie('jwt', TOKEN, {
      maxAge: 1000 * 60 * 60 * 24,
      expires,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    const user = {
      name: user_doc.name,
      role: user_doc.role,
      _id: user_doc.id,
      image: user_doc.image,
      email: user_doc.email,
    };

    res.status(200).json({
      status: 'success',
      message: 'Login successfully (POST)',
      data: user,
    });
  } catch (e) {
    console.log(e);

    next(new Error('Failed to log the user in. '));
  }
};

// Handler to log out a user
export const logout_get: RequestHandler = async (_req, res, next) => {
  try {
    // Set Access-Control-Allow-Origin header
    res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);

    // 1 day in milliseconds = 1000 * 60 * 60 * 24

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
    console.log(e);

    next(new Error('Failed to log the user out. '));
  }
};

// Handler to update user details
export const updateUser_patch: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, role, id } = req.body; // Destructure request body
    const image = req.file; // Get image file from request
    if (!id) throw new Error('No user id provide'); // Throw error if user ID is not provided
    const user = UserModel.findById(id);
    if (!user) throw new Error('No user found with the provided id'); // Throw error if user is not found

    let result = null;
    if (image && image.filename) {
      const IMAGE = await uploadImageToCloud(image.filename); // Upload new image to cloud
      result = await UserModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          role,
          image: IMAGE,
        },
        { new: true }
      );
    } else {
      result = await UserModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          role,
        },
        { new: true }
      );
    }

    res.status(200).json({
      status: 'success',
      message: 'user successfully updated',
      data: {
        email: result?.email,
        image: result?.image,
        name: result?.name,
        role: result?.role,
        _id: result?.id,
      },
    });
  } catch (e) {
    console.log(e);
    next(new Error('Failed to update the user. '));
  }
};

// Handler to provide the user a temporary JWT token, in order to change|update password
export const reset_token_get: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body; // Destructure request body
    if (!email) throw new Error('No email provided'); // Throw error if email is not provided

    const user = await UserModel.findOne({ email }); // Find user by email

    if (!user) throw new Error('No user found with the provided email'); // Throw error if user is not found

    const TOKEN = await createJWT(user.id); // Create JWT token for the user

    if (!TOKEN) throw new Error('Failed to generate JWT'); // Throw error if token generation fails

    res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL); // Set Access-Control-Allow-Origin header

    // 1 day from now
    const expires = new Date(Date.now() + 86400e3);
    // 1 day in milliseconds = 1000 * 60 * 60 * 24

    res.cookie('jwt', TOKEN, {
      maxAge: 1000 * 60 * 60 * 24,
      expires,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    res.status(200).json({
      status: 'success',
      message: 'Token successfully created',
      data: user.email,
    });
  } catch (e) {
    console.log(e);
    next(new Error('Failed to provided reset-token.'));
  }
};

// Handler to update user password
export const update_password_post: RequestHandler = async (req, res, next) => {
  try {
    const { password, password_confirm, email } = req.body; // Destructure request body
    if (!password || !password_confirm || !email)
      throw new Error('Please provide password, password_confirm and email'); // Throw error if any field is missing

    if (password !== password_confirm) throw new Error('Invalid passwords'); // Throw error if passwords do not match

    const user = await UserModel.findOne({ email }); // Find user by email
    if (!user) throw new Error('No user found with the provided email'); // Throw error if user is not found

    user.password = password;
    user.password_confirm = password_confirm;
    user.updated_at = new Date(); // Set updated_at to current date

    await user.save(); // Save the updated user document

    res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);

    res.status(200).json({
      status: 'success',
      message: 'Password successfully updated',
    });
  } catch (e) {
    console.log(e);
    next(new Error('Failed to update password.'));
  }
};

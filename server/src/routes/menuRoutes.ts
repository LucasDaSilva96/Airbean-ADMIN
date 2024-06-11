import express from 'express';

import {
  menu_create_post,
  menu_delete,
  menu_get,
  menu_update_patch,
} from '../controllers/menuController.js';
import { adminOnly, protect } from '../controllers/protectRouteController.js';
import { upload } from '../utils/multer_upload.js';

export const menuRouter = express.Router();

// GET
menuRouter.get('/', menu_get);

// Protected routes

// POST
menuRouter.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  menu_create_post
);

// PATCH
menuRouter.patch(
  '/:itemID',
  protect,
  adminOnly,
  upload.single('image'),
  menu_update_patch
);

// DELETE
menuRouter.delete('/:itemID', protect, adminOnly, menu_delete);

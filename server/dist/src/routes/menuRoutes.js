import express from 'express';
import { menu_create_post, menu_delete, menu_get, menu_update_patch, } from '../controllers/menuController.js';
import { adminOnly, protect } from '../controllers/protectRouteController.js';
import { upload } from '../utils/multer_upload.js';
export const menuRouter = express.Router(); // Create a new router for menu items
// Public route to get all menu items
menuRouter.get('/', menu_get);
// Protected routes
// Route to create a new menu item, protected and restricted to admin only
menuRouter.post('/', protect, adminOnly, upload.single('image'), // Middleware to handle image upload
menu_create_post);
// Route to update an existing menu item, protected and restricted to admin only
menuRouter.patch('/:itemID', protect, adminOnly, upload.single('image'), // Middleware to handle image upload
menu_update_patch);
// Route to delete a menu item, protected and restricted to admin only
menuRouter.delete('/:itemID', protect, adminOnly, menu_delete);
//# sourceMappingURL=menuRoutes.js.map
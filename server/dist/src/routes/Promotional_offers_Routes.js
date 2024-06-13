import express from 'express';
import { promotional_create_post, promotional_delete, promotional_get, promotional_update_patch, } from '../controllers/Promotional_offersController.js';
import { protect, adminOnly } from '../controllers/protectRouteController.js';
export const promotionalRouter = express.Router(); // Create a new router for promotional offers
// Public route to get all promotional offers
promotionalRouter.get('/', promotional_get);
// Protected routes
// Route to create a new promotional offer, protected and restricted to admin only
promotionalRouter.post('/', protect, adminOnly, promotional_create_post);
// Route to update an existing promotional offer, protected and restricted to admin only
promotionalRouter.patch('/:offerID', protect, adminOnly, promotional_update_patch);
// Route to delete a promotional offer, protected and restricted to admin only
promotionalRouter.delete('/:offerID', protect, adminOnly, promotional_delete);
//# sourceMappingURL=Promotional_offers_Routes.js.map
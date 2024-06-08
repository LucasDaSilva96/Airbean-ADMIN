import express from 'express';
import { promotional_create_post, promotional_delete, promotional_get, promotional_update_patch, } from '../controllers/Promotional_offersController.js';
import { protect, adminOnly } from '../controllers/protectRouteController.js';
export const promotionalRouter = express.Router();
// GET
promotionalRouter.get('/', promotional_get);
// Protected routes
// POST
promotionalRouter.post('/', protect, adminOnly, promotional_create_post);
// PATCH
promotionalRouter.patch('/:offerID', protect, adminOnly, promotional_update_patch);
// DELETE
promotionalRouter.delete('/:offerID', protect, adminOnly, promotional_delete);
//# sourceMappingURL=Promotional_offers_Routes.js.map
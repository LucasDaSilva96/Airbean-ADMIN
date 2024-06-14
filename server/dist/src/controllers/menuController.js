var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MenuModel } from '../model/Menu.js';
import { uploadImageToCloud } from '../utils/multer_upload.js';
import { Promotional_offers_Model } from '../model/Promotional_offers.js';
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL; // Client base URL from environment variables
// Handler to get all menu items
export const menu_get = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield MenuModel.find(); // Fetch all menu items
        res.status(200).json({
            status: 'success',
            message: 'Menu successfully fetched',
            data: menu, // Send menu items data in response
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to fetch menu items.'));
    }
});
// Protected actions
// Handler to create a new menu item
export const menu_create_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, price } = req.body; // Destructure request body to get title, description, and price
        if (!title || !desc || !price)
            throw new Error('Please provide a title, description and price'); // Throw error if any field is missing
        const image = req.file; // Get image file from request
        if (image) {
            const IMAGE = yield uploadImageToCloud(image.filename); // Upload image to cloud
            yield MenuModel.create({ title, desc, price, image: IMAGE }); // Create menu item with image
        }
        else {
            yield MenuModel.create({ title, desc, price }); // Create menu item without image
        }
        // Set Access-Control-Allow-Origin header
        res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);
        res.status(201).json({
            status: 'success',
            message: 'Menu item successfully created',
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to create menu item.'));
    }
});
// Handler to update an existing menu item
export const menu_update_patch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file; // Get image file from request
        let item = null; // Initialize item variable
        const submissionObj = {
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
            modified_at: Date.now(), // Set modified_at to current date
        };
        if (image && image.filename) {
            const IMAGE = yield uploadImageToCloud(image.filename); // Upload new image to cloud
            item = yield MenuModel.findByIdAndUpdate(req.body.id, Object.assign(Object.assign({}, submissionObj), { image: IMAGE }), { new: true });
        }
        else {
            item = yield MenuModel.findByIdAndUpdate(req.body.id, submissionObj); // Update menu item without new image
        }
        if (!item)
            throw new Error('Failed to update item'); // Throw error if update fails
        res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);
        res.status(202).json({
            status: 'success',
            message: 'Item successfully updated',
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to update menu item.'));
    }
});
// Handler to delete a menu item
export const menu_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemID } = req.params; // Get item ID from request parameters
        if (!itemID)
            throw new Error('No item id provided'); // Throw error if item ID is not provided
        yield MenuModel.findByIdAndDelete(itemID); // Delete the menu item by ID
        const offers = yield Promotional_offers_Model.find(); // Fetch all promotional offers
        if (offers.length > 0) {
            for (const offer of offers) {
                if (offer.promotional_items.length > 0) {
                    // Find index of the item in promotional offers
                    const index = offer.promotional_items.findIndex((el) => el.id === itemID);
                    if (index >= 0) {
                        // Remove the item from promotional offers
                        offer.promotional_items.pull(itemID);
                        yield offer.save(); // Save the updated offer
                    }
                }
            }
        }
        res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);
        res.status(200).json({
            status: 'success',
            message: 'Item successfully deleted',
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to delete menu item.'));
    }
});
//# sourceMappingURL=menuController.js.map
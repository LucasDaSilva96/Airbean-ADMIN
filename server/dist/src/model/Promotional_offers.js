var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import { menuSchema, MenuModel } from './Menu.js';
// Define the promotional schema with various fields and their constraints
const promotionalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    promotional_items: [menuSchema],
    created_at: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 1,
    },
    modified_at: {
        type: Date,
    },
});
// Pre-save middleware to validate promotional items before saving the promotional offer document
promotionalSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let allItemsExist = true; // Flag to check if all promotional items exist in the menu
        const menu_items = yield MenuModel.find(); // Fetch all menu items
        // Check if each promotional item exists in the menu
        this.promotional_items.map((item) => {
            const found = menu_items.find((menuItem) => menuItem.title === item.title &&
                menuItem.desc === item.desc &&
                menuItem.price === item.price);
            if (!found) {
                allItemsExist = false; // Set flag to false if any item is not found
            }
            else {
                allItemsExist = true;
            }
        });
        if (!allItemsExist) {
            next(new Error("All items doesn't exist in the menu")); // Pass error to next middleware if any item doesn't exist
        }
        else {
            next(); // Call the next middleware
        }
    });
});
// Create and export the promotional offers model
export const Promotional_offers_Model = mongoose.model('promotional_offer', promotionalSchema);
//# sourceMappingURL=Promotional_offers.js.map
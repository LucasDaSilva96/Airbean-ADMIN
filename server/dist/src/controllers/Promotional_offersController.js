var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Promotional_offers_Model } from '../model/Promotional_offers.js';
// Handler to get all promotional offers
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL; // Client base URL from environment variables
export const promotional_get = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotional_offers = yield Promotional_offers_Model.find(); // Fetch all promotional offers
        res.status(200).json({
            status: 'success',
            message: 'Offers successfully fetched',
            data: promotional_offers,
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to fetch offers.'));
    }
});
// Protected actions
// Handler to create a new promotional offer
export const promotional_create_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield Promotional_offers_Model.create(Object.assign({}, req.body)); // Create a new promotional offer with request body data
        res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);
        res.status(201).json({
            status: 'success',
            message: 'Promotional offer successfully created',
            data: offer,
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to create offer.'));
    }
});
// Handler to update an existing promotional offer
export const promotional_update_patch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offerID } = req.params; // Get offer ID from request parameters
        if (!offerID)
            throw new Error('No offer id provided'); // Throw error if offer ID is not provided
        const offer = yield Promotional_offers_Model.findByIdAndUpdate(offerID, Object.assign(Object.assign({}, req.body), { modified_at: Date.now() }));
        if (!offer)
            throw new Error('Failed to update offer'); // Throw error if update fails
        res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);
        res.status(202).json({
            status: 'success',
            message: 'Promotional offer successfully updated',
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to update offer.'));
    }
});
// Handler to delete a promotional offer
export const promotional_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offerID } = req.params; // Get offer ID from request parameters
        if (!offerID)
            throw new Error('No offer id provided'); // Throw error if offer ID is not provided
        yield Promotional_offers_Model.findByIdAndDelete(offerID); // Delete the promotional offer by ID
        res.header('Access-Control-Allow-Origin', CLIENT_BASE_URL);
        res.status(202).json({
            status: 'success',
            message: 'Promotional offer successfully deleted',
        });
    }
    catch (e) {
        console.log(e);
        next(new Error('Failed to delete offer.'));
    }
});
//# sourceMappingURL=Promotional_offersController.js.map
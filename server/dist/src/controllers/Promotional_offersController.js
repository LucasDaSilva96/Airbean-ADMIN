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
export const promotional_get = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promotional_offers = yield Promotional_offers_Model.find();
        res.status(200).json({
            status: 'success',
            message: 'Offers successfully fetched',
            data: promotional_offers,
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            throw new Error(e.toLocaleLowerCase());
        }
        else if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
});
// Protected actions
export const promotional_create_post = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield Promotional_offers_Model.create(Object.assign({}, req.body));
        res.status(201).json({
            status: 'success',
            message: 'Promotional offer successfully created',
            data: offer,
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            throw new Error(e.toLocaleLowerCase());
        }
        else if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
});
export const promotional_update_patch = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offerID } = req.params;
        if (!offerID)
            throw new Error('No offer id provided');
        const offer = yield Promotional_offers_Model.findByIdAndUpdate(offerID, Object.assign({}, req.body));
        if (!offer)
            throw new Error('Failed to update offer');
        res.status(202).json({
            status: 'success',
            message: 'Promotional offer successfully updated',
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            throw new Error(e.toLocaleLowerCase());
        }
        else if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
});
export const promotional_delete = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { offerID } = req.params;
        if (!offerID)
            throw new Error('No offer id provided');
        const offer = yield Promotional_offers_Model.findByIdAndUpdate(offerID, {
            active: false,
        });
        if (!offer)
            throw new Error('Failed to delete offer');
        res.status(202).json({
            status: 'success',
            message: 'Promotional offer successfully deleted',
        });
    }
    catch (e) {
        if (typeof e === 'string') {
            throw new Error(e.toLocaleLowerCase());
        }
        else if (e instanceof Error) {
            throw new Error(e.message);
        }
    }
});
//# sourceMappingURL=Promotional_offersController.js.map
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
export const menu_get = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield MenuModel.find();
        res.status(200).json({
            status: 'success',
            message: 'Menu successfully fetched',
            data: menu,
        });
    }
    catch (e) {
        next(new Error('Failed to fetch menu items. Line 16'));
    }
});
// Protected actions
export const menu_create_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, price } = req.body;
        if (!title || !desc || !price)
            throw new Error('Please provide a title, description and price');
        const image = req.file;
        if (image) {
            const IMAGE = yield uploadImageToCloud(image.filename);
            yield MenuModel.create({ title, desc, price, image: IMAGE });
        }
        else {
            yield MenuModel.create({ title, desc, price });
        }
        res.status(201).json({
            status: 'success',
            message: 'Menu item successfully created',
        });
    }
    catch (e) {
        next(new Error('Failed to create menu item. Line 46'));
    }
});
export const menu_update_patch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const image = req.file;
        let item = null;
        const submissionObj = {
            title: req.body.title,
            desc: req.body.desc,
            price: req.body.price,
        };
        if (image && image.filename) {
            const IMAGE = yield uploadImageToCloud(image.filename);
            item = yield MenuModel.findByIdAndUpdate(req.body.id, Object.assign(Object.assign({}, submissionObj), { image: IMAGE }));
        }
        else {
            item = yield MenuModel.findByIdAndUpdate(req.body.id, submissionObj);
        }
        if (!item)
            throw new Error('Failed to update item');
        res.status(202).json({
            status: 'success',
            message: 'Item successfully updated',
        });
    }
    catch (e) {
        next(new Error('Failed to update menu item. Line 83'));
    }
});
export const menu_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemID } = req.params;
        if (!itemID)
            throw new Error('No item id provided');
        yield MenuModel.findByIdAndDelete(itemID);
        const offers = yield Promotional_offers_Model.find();
        if (offers.length > 0) {
            for (const offer of offers) {
                if (offer.promotional_items.length > 0) {
                    const index = offer.promotional_items.findIndex((el) => el.id === itemID);
                    if (index >= 0) {
                        offer.promotional_items.pull(itemID);
                        yield offer.save();
                    }
                }
            }
        }
        res.status(200).json({
            status: 'success',
            message: 'Item successfully deleted',
        });
    }
    catch (e) {
        next(new Error('Failed to delete menu item. Line 122'));
    }
});
//# sourceMappingURL=menuController.js.map
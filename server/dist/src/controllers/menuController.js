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
export const menu_get = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menu = yield MenuModel.find();
        res.status(200).json({
            status: 'success',
            message: 'Menu successfully fetched',
            data: menu,
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
export const menu_create_post = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MenuModel.create(Object.assign({}, req.body));
        res.status(201).json({
            status: 'success',
            message: 'Menu item successfully created',
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
export const menu_update_patch = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemID } = req.params;
        if (!itemID)
            throw new Error('No item id provided');
        const item = yield MenuModel.findByIdAndUpdate(itemID, Object.assign(Object.assign({}, req.body), { modified_at: Date.now() }));
        if (!item)
            throw new Error('Failed to update item');
        res.status(202).json({
            status: 'success',
            message: 'Item successfully updated',
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
export const menu_delete = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemID } = req.params;
        if (!itemID)
            throw new Error('No item id provided');
        const item = yield MenuModel.findByIdAndDelete(itemID);
        if (!item)
            throw new Error('Failed to delete item');
        res.status(200).json({
            status: 'success',
            message: 'Item successfully deleted',
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
//# sourceMappingURL=menuController.js.map
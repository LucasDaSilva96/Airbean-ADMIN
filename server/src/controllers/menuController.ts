import { RequestHandler } from 'express';
import { MenuModel } from '../model/Menu.js';
import { uploadImageToCloud } from '../utils/multer_upload.js';

export const menu_get: RequestHandler = async (_req, res, _next) => {
  try {
    const menu = await MenuModel.find();

    res.status(200).json({
      status: 'success',
      message: 'Menu successfully fetched',
      data: menu,
    });
  } catch (e) {
    if (typeof e === 'string') {
      throw new Error(e.toLocaleLowerCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

// Protected actions

export const menu_create_post: RequestHandler = async (req, res, _next) => {
  try {
    const { title, desc, price } = req.body;
    if (!title || !desc || !price)
      throw new Error('Please provide a title, description and price');

    const image = req.file;

    if (image) {
      const IMAGE = await uploadImageToCloud(image.filename);
      await MenuModel.create({ title, desc, price, image: IMAGE });
    } else {
      await MenuModel.create({ title, desc, price });
    }

    res.status(201).json({
      status: 'success',
      message: 'Menu item successfully created',
    });
  } catch (e) {
    if (typeof e === 'string') {
      throw new Error(e.toLocaleLowerCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export const menu_update_patch: RequestHandler = async (req, res, _next) => {
  try {
    const { itemID } = req.params;
    if (!itemID) throw new Error('No item id provided');

    const item = await MenuModel.findByIdAndUpdate(itemID, {
      ...req.body,
      modified_at: Date.now(),
    });

    if (!item) throw new Error('Failed to update item');

    res.status(202).json({
      status: 'success',
      message: 'Item successfully updated',
    });
  } catch (e) {
    if (typeof e === 'string') {
      throw new Error(e.toLocaleLowerCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export const menu_delete: RequestHandler = async (req, res, _next) => {
  try {
    const { itemID } = req.params;
    if (!itemID) throw new Error('No item id provided');

    const item = await MenuModel.findByIdAndDelete(itemID);

    if (!item) throw new Error('Failed to delete item');

    res.status(200).json({
      status: 'success',
      message: 'Item successfully deleted',
    });
  } catch (e) {
    if (typeof e === 'string') {
      throw new Error(e.toLocaleLowerCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

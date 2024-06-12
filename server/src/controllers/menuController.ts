import { RequestHandler } from 'express';
import { MenuModel } from '../model/Menu.js';
import { uploadImageToCloud } from '../utils/multer_upload.js';
import { Promotional_offers_Model } from '../model/Promotional_offers.js';

export const menu_get: RequestHandler = async (_req, res, next) => {
  try {
    const menu = await MenuModel.find();

    res.status(200).json({
      status: 'success',
      message: 'Menu successfully fetched',
      data: menu,
    });
  } catch (e) {
    next(new Error('Failed to fetch menu items. Line 16'));
  }
};

// Protected actions

export const menu_create_post: RequestHandler = async (req, res, next) => {
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
    next(new Error('Failed to create menu item. Line 46'));
  }
};

export const menu_update_patch: RequestHandler = async (req, res, next) => {
  try {
    const image = req.file;

    let item = null;

    const submissionObj = {
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
    };

    if (image && image.filename) {
      const IMAGE = await uploadImageToCloud(image.filename);
      item = await MenuModel.findByIdAndUpdate(req.body.id, {
        ...submissionObj,
        image: IMAGE,
      });
    } else {
      item = await MenuModel.findByIdAndUpdate(req.body.id, submissionObj);
    }

    if (!item) throw new Error('Failed to update item');

    res.status(202).json({
      status: 'success',
      message: 'Item successfully updated',
    });
  } catch (e) {
    next(new Error('Failed to update menu item. Line 83'));
  }
};

export const menu_delete: RequestHandler = async (req, res, next) => {
  try {
    const { itemID } = req.params;
    if (!itemID) throw new Error('No item id provided');

    await MenuModel.findByIdAndDelete(itemID);

    const offers = await Promotional_offers_Model.find();

    if (offers.length > 0) {
      for (const offer of offers) {
        if (offer.promotional_items.length > 0) {
          const index = offer.promotional_items.findIndex(
            (el) => el.id === itemID
          );

          if (index >= 0) {
            offer.promotional_items.pull(itemID);
            await offer.save();
          }
        }
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Item successfully deleted',
    });
  } catch (e) {
    next(new Error('Failed to delete menu item. Line 122'));
  }
};

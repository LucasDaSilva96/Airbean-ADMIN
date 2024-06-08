import { RequestHandler } from 'express';
import { Promotional_offers_Model } from '../model/Promotional_offers.js';

export const promotional_get: RequestHandler = async (_req, res, _next) => {
  try {
    const promotional_offers = await Promotional_offers_Model.find();

    res.status(200).json({
      status: 'success',
      message: 'Offers successfully fetched',
      data: promotional_offers,
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

export const promotional_create_post: RequestHandler = async (
  req,
  res,
  _next
) => {
  try {
    const offer = await Promotional_offers_Model.create({ ...req.body });

    res.status(201).json({
      status: 'success',
      message: 'Promotional offer successfully created',
      data: offer,
    });
  } catch (e) {
    if (typeof e === 'string') {
      throw new Error(e.toLocaleLowerCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export const promotional_update_patch: RequestHandler = async (
  req,
  res,
  _next
) => {
  try {
    const { offerID } = req.params;

    if (!offerID) throw new Error('No offer id provided');

    const offer = await Promotional_offers_Model.findByIdAndUpdate(offerID, {
      ...req.body,
    });

    if (!offer) throw new Error('Failed to update offer');

    res.status(202).json({
      status: 'success',
      message: 'Promotional offer successfully updated',
    });
  } catch (e) {
    if (typeof e === 'string') {
      throw new Error(e.toLocaleLowerCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export const promotional_delete: RequestHandler = async (req, res, _next) => {
  try {
    const { offerID } = req.params;

    if (!offerID) throw new Error('No offer id provided');

    const offer = await Promotional_offers_Model.findByIdAndUpdate(offerID, {
      active: false,
    });

    if (!offer) throw new Error('Failed to delete offer');

    res.status(202).json({
      status: 'success',
      message: 'Promotional offer successfully deleted',
    });
  } catch (e) {
    if (typeof e === 'string') {
      throw new Error(e.toLocaleLowerCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

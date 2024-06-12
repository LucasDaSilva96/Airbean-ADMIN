import { RequestHandler } from 'express';
import { Promotional_offers_Model } from '../model/Promotional_offers.js';

export const promotional_get: RequestHandler = async (_req, res, next) => {
  try {
    const promotional_offers = await Promotional_offers_Model.find();

    res.status(200).json({
      status: 'success',
      message: 'Offers successfully fetched',
      data: promotional_offers,
    });
  } catch (e) {
    next(new Error('Failed to fetch offers. Line 14'));
  }
};

// Protected actions

export const promotional_create_post: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const offer = await Promotional_offers_Model.create({ ...req.body });

    res.status(201).json({
      status: 'success',
      message: 'Promotional offer successfully created',
      data: offer,
    });
  } catch (e) {
    next(new Error('Failed to create offer. Line 34'));
  }
};

export const promotional_update_patch: RequestHandler = async (
  req,
  res,
  next
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
    next(new Error('Failed to update offer. Line 59'));
  }
};

export const promotional_delete: RequestHandler = async (req, res, next) => {
  try {
    const { offerID } = req.params;

    if (!offerID) throw new Error('No offer id provided');

    await Promotional_offers_Model.findByIdAndDelete(offerID);

    res.status(202).json({
      status: 'success',
      message: 'Promotional offer successfully deleted',
    });
  } catch (e) {
    next(new Error('Failed to delete offer. Line 76'));
  }
};

import { RequestHandler } from 'express';
import { Promotional_offers_Model } from '../model/Promotional_offers.js';
// Handler to get all promotional offers
export const promotional_get: RequestHandler = async (_req, res, next) => {
  try {
    const promotional_offers = await Promotional_offers_Model.find(); // Fetch all promotional offers

    res.status(200).json({
      status: 'success',
      message: 'Offers successfully fetched',
      data: promotional_offers,
    });
  } catch (e) {
    console.log(e);
    next(new Error('Failed to fetch offers.'));
  }
};

// Protected actions

// Handler to create a new promotional offer
export const promotional_create_post: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const offer = await Promotional_offers_Model.create({ ...req.body }); // Create a new promotional offer with request body data

    res.status(201).json({
      status: 'success',
      message: 'Promotional offer successfully created',
      data: offer,
    });
  } catch (e) {
    console.log(e);
    next(new Error('Failed to create offer.'));
  }
};

// Handler to update an existing promotional offer
export const promotional_update_patch: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { offerID } = req.params; // Get offer ID from request parameters

    if (!offerID) throw new Error('No offer id provided'); // Throw error if offer ID is not provided

    const offer = await Promotional_offers_Model.findByIdAndUpdate(offerID, {
      ...req.body,
      modified_at: Date.now(), // Set modified_at to current date
    });

    if (!offer) throw new Error('Failed to update offer'); // Throw error if update fails

    res.status(202).json({
      status: 'success',
      message: 'Promotional offer successfully updated',
    });
  } catch (e) {
    console.log(e);
    next(new Error('Failed to update offer.'));
  }
};

// Handler to delete a promotional offer
export const promotional_delete: RequestHandler = async (req, res, next) => {
  try {
    const { offerID } = req.params; // Get offer ID from request parameters

    if (!offerID) throw new Error('No offer id provided'); // Throw error if offer ID is not provided

    await Promotional_offers_Model.findByIdAndDelete(offerID); // Delete the promotional offer by ID

    res.status(202).json({
      status: 'success',
      message: 'Promotional offer successfully deleted',
    });
  } catch (e) {
    console.log(e);
    next(new Error('Failed to delete offer.'));
  }
};

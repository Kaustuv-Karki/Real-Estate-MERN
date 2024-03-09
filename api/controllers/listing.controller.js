import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing Not Found"));
  if (listing.userRef !== req.user.id)
    return next(errorHandler(403, "You can not delete this listing"));
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing was deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(res.params.id);
  if (!listing) return next(errorHandler(404, "Listing Not Found"));
  if (listing.userRef !== req.user.id)
    return next(errorHandler(403, "You can not update this listing"));
  try {
    const updatedListing = await listing.findByIdAndUpdate(
      req.params,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

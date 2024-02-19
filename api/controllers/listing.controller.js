import Listing from "../models/listing.model.js";

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

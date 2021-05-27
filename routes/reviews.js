const express = require('express');

//set merge params to true so that params is recognized from the index.js file
const router = express.Router({ mergeParams: true });


const { reviewSchema } = require('../schemas.js')
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review')

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

router.post('', validateReview, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);

}))

//reviewId being used beccause we want to remove the reference to the revie in the campground and we want to remove the review itself 
router.delete('/', catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`);

}))


module.exports = router;
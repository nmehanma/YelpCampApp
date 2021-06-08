const express = require('express');
//set merge params to true so that params is recognized from the index.js file
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

//creating  new review

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

//reviewId being used beccause we want to remove the reference to the review in the campground and we want to remove the review itself 
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));


module.exports = router;
const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.route('/')
  .get(catchAsync(campgrounds.index))
  //create a new campground
  .post(upload.array('image'),(req,res) => {
    console.log(req.body, req.files);
    res.send("IT WORKED")
  })
  // .post(
  //   isLoggedIn,
  //   validateCampground,
  //   catchAsync(campgrounds.createCampground));

//new screen to get campground
router.get('/new',
  isLoggedIn,
  campgrounds.renderNewForm)

router.route('/:id')
  //show campground
  .get(catchAsync(campgrounds.showCampground))
  // updating campground
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground, catchAsync(campgrounds.updateCampground))
  // deleting a campground
  .delete(
    isLoggedIn,
    isAuthor,
    catchAsync(campgrounds.deleteCampground));

//edit screen of a campground
router.get('/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm));

module.exports = router;

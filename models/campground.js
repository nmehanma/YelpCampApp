const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

//https://res.cloudinary.com/doqlk4ocr/image/upload/w_300/v1623893154/YelpCamp/yifyiz1aielconqiiaqm.jpg

const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200')
});
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [  // review, an array of object Id's on each campground
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
}, opts);


CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
<p>${this.description.substring(0, 20)}...</p>`
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

//exporting the model name Campground named CampgroundSchema

module.exports = mongoose.model('Campground', CampgroundSchema);

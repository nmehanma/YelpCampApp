const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title:String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [  // review, an array of object Id's on each campground
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

//exporting the model name Campground named CampgroundSchema

module.exports = mongoose.model('Campground', CampgroundSchema);

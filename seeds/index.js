//run this file on its own separately from our node app everytime we want to seed our data, anytime we want to make changes to our model or data
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp-app', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true

});

//to check if there is an error or successfully opened db

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];



//first we will delete everything from in the database  and then we make 50 examples
// random1000 because there are 1000 cities in the array being reviewed, 
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60b5a64e60ce095bdb868a93',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            'https://res.cloudinary.com/doqlk4ocr/image/upload/v1623629024/YelpCamp/hpbx5jusc7msbp3vxsbu.jpg',
          filename: 'YelpCamp/hpbx5jusc7msbp3vxsbu'
        },
        {
          url:
            'https://res.cloudinary.com/doqlk4ocr/image/upload/v1623629024/YelpCamp/atzod9rene7r12frxlb2.jpg',
          filename: 'YelpCamp/atzod9rene7r12frxlb2'
        }
      ],
      description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste eaque laboriosam fugit cum sequi beatae itaque molestiae aliquid illo, ex voluptate vel assumenda corporis rem ab ipsum odit earum quidem?',
      price


    });
    await camp.save();
  };
};

seedDB().then(() => {
  mongoose.connection.close();
});

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
  for(let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location:`${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`

    });
    await camp.save();
  };
};

seedDB().then(() => {
  mongoose.connection.close();
});

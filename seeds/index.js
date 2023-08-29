const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64e9e3cf3a3d9f926b410784',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            image: [
                {
                    url: 'https://res.cloudinary.com/dt5usu7vu/image/upload/v1693300456/YelpCamp/jkshe4sbq9zztyikfce5.webp',
                    filename: 'YelpCamp/jkshe4sbq9zztyikfce5'
                },
                {
                    url: 'https://res.cloudinary.com/dt5usu7vu/image/upload/v1693218858/YelpCamp/npwmouyr5szanxykgp0r.png',
                    filename: 'YelpCamp/npwmouyr5szanxykgp0r'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

const mongoose = require('mongoose');

var mongoUrl = 'mongodb+srv://tharushi:it22351272@cluster0.6yudeu5.mongodb.net/HotelBooking';

mongoose.connect(mongoUrl)

var connection = mongoose.connection;

connection.on('error',()=>{
    console.log("Database connection Failed");
});


connection.on('connected',()=>{
 console.log("Database connection is successfull");
});

module.exports = mongoose;
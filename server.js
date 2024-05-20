const express = require('express');

const app = express();
const dbConfig = require('./db');
const roomsRoute =require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');
app.use(express.json());

const port=  process.env.PORT || 5000;

app.use('/api/rooms', roomsRoute);
app.use('/api/users',usersRoute);
app.use('/api/bookings', bookingsRoute);

app.listen(port ,() =>console.log('server is running '));
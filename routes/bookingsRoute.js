const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51OXeo4FVbTijR6AmZHscthjHXAE0czh60jNIwvTGrdJuyfdL3T2GxjqlNQSzpcu4CYpWZI61vum1a6Z8DOEas7mP00n0CUekHM"
);
router.post("/bookroom", async (req, res) => {
  const { room, userid, startDate, endDate, totalamount, totalDays, token } =
    req.body;
  const startDateMoment = moment(startDate, "DD-MM-YYYY");
  const endDateMoment = moment(endDate, "DD-MM-YYYY");
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "LKR",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      const newBooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        startDate: startDateMoment.format("DD-MM-YYYY"),
        endDate: endDateMoment.format("DD-MM-YYYY"),
        totalDays,
        totalDays,
        totalamount,
        transactionId: "1234",
      });
      const booking = await newBooking.save();
      const roomTemp = await Room.findOne({ _id: room._id });

      roomTemp.currentbookings.push({
        bookingid: booking._id,
        startDate: startDateMoment.format("DD-MM-YYYY"),
        endDate: endDateMoment.format("DD-MM-YYYY"),
        userid: userid,
        isbooked: booking.isBooked,
      });
      await roomTemp.save();
    }
    res.send("payement successfull .Your room is booked");
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
});
router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
});
router.post("/cancelBooking", async (req, res) => {
  const bookingid = req.body.bookingid;

  const roomid = req.body.roomid;

  try {
    const bookingItem = await Booking.findOne({ _id: bookingid });

    bookingItem.isBooked = false;
    await bookingItem.save();
    const room = await Room.findOne({ _id: roomid });

    const bookings = room.currentbookings;

    const index = bookings.findIndex(
      (booking) => booking.bookingid.toString() === bookingid
    );

    if (index !== -1) {
      console.log(`Index of booking to be removed: ${index}`);
      bookings.splice(index, 1);
      console.log("Booking removed successfully");
    } else {
      console.log("Booking not found in currentbookings array");
    }
    await room.save();
    res.send(roomid);
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
});
router.get("/getallbookings", async (req, res) => {
  try {
      const bookings = await Booking.find();
      
      res.send(bookings);
      
  } catch (error) {
      return res.status(400).json({ message: error });
  }
});
module.exports = router;

const mongoose = require("mongoose");

const bookinSchema = mongoose.Schema(
  {
    room: { type: String, required: true },
    roomid: { type: String, required: true },
    userid: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalamount: { type: Number, required: true },
    totalDays: { type: Number, required: true },
    isBooked: { type: Boolean, default: true},
  },
  {
    timestamps: true,
  }
);
const bookingModel = mongoose.model("bookings", bookinSchema);

module.exports = bookingModel;

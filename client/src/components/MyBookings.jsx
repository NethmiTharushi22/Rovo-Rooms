import React, { useEffect, useState } from "react";
import axios from "axios";

import { Tag } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [bookings, setbookings] = useState([]);

  useEffect(() => {
    async function getBookings() {
      setloading(true);

      try {
        setloading(true);
        const bookings = await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        });

        setbookings(bookings.data);
        setloading(false);
      } catch (error) {
        seterror(error);
        setloading(false);
      }
    }
    getBookings();
  }, [user._id]);
  async function cancelBooking(booking) {
    const bookingid = booking._id;
    const roomid = booking.roomid;
    try {
      const cancel = await axios.post("/api/bookings/cancelBooking", {
        bookingid,
        roomid,
      });
      console.log(cancel);
      if (cancel) {
        Swal.fire({
          title: "Cancelation Successful",
          text: "Press 'OK' to redirect",
          icon: "success",
        }).then((results) => {window.location.reload();});
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Oops","something went wrong",'error',);
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {error && <Error />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="bs">
                  <h1>{booking.room}</h1>
                  <p>From :{booking.startDate}</p>
                  <p>To :{booking.endDate}</p>
                  <p>Days:{booking.totalDays}</p>
                  <p>Amount:{booking.totalamount}</p>
                  <p>Transaction Id: {booking.transactionId}</p>
                  <p>
                    Booking status:{" "}
                    {booking.isBooked ? (
                      <Tag color="green">Active</Tag>
                    ) : (
                      <Tag color="red">Canceled</Tag>
                    )}
                  </p>
                  <div className="d-flex justify-content-end">
                    {booking.isBooked && (
                      <button
                        className="btn btn-primary"
                        style={{
                          backgroundColor: "#323232",
                          boxShadow: "none",
                          borderColor: "#323232",
                        }}
                        onClick={() => cancelBooking(booking)}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;

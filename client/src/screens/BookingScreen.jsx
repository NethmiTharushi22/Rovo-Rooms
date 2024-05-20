import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

function BookingScreen() {
  const { roomid, startDate, endDate } = useParams();
  const [room, setroom] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const startDateMoment = moment(startDate, "DD-MM-YYYY");
  const endDateMoment = moment(endDate, "DD-MM-YYYY");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const totalDays =
    moment
      .duration(
        moment(endDate, "DD-MM-YYYY").diff(moment(startDate, "DD-MM-YYYY"))
      )
      .asDays() + 1;

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }
    const bookingDetails = async () => {
      try {
        setloading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: roomid })
        ).data;
        setroom(data);
        setloading(false);
      } catch (error) {
        setloading(false);

        seterror(error);
      }
    };
    bookingDetails();
  }, [roomid]);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: currentUser._id,
      startDate: startDateMoment.format("DD-MM-YYYY"),
      endDate: endDateMoment.format("DD-MM-YYYY"),
      totalamount: totalDays * room.rentperday,
      totalDays,
      token,
    };
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);

      Swal.fire(
        "Congratulations!",
        "Your room booked successfully",
        "sucess"
      ).then((result) => {
        window.location.href = "/bookings";
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(error);
      Swal.fire("Oops!", " Something went wrong!", "error");
    }
  }
  return (
    <div className=" m-4">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div className="bs">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img
                src={room.imageurls?.[0]}
                className="bigImg"
                alt={room.name}
              />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <p>Name:{currentUser.name}</p>
                <p>From Date:{startDateMoment.format("DD-MM-YYYY")}</p>
                <p>To Date:{endDateMoment.format("DD-MM-YYYY")}</p>
                <p>Max Count:{room.maxcount}</p>
                <hr />
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />
                <p>Total Days:{totalDays}</p>
                <p>Rent Per Day:{room.rentperday}</p>
                <p>Total Amount:{room.rentperday * totalDays}</p>
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={room.rentperday * totalDays * 100}
                  token={onToken}
                  currency="LKR"
                  stripeKey="pk_test_51OXeo4FVbTijR6AmrYw0oiJEdnXNaKVkfHNmYtMj4kNZLS5OgS4IAOvRYuzdksLIDI69UTno5IjG4YbjRyMeLL3S004u3dUBKW"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;

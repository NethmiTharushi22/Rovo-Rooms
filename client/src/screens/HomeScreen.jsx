import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";

import { DatePicker } from "antd";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 1000 });
const { RangePicker } = DatePicker;
function HomeScreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("");
  useEffect(() => {
    async function getRoomData() {
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data);
        
        setDuplicateRooms(data);
        setloading(false);
        console.log(data);
      } catch (error) {
        seterror(error);
        setloading(false);
        console.log("Error fetch data", error);
      }
    }
    getRoomData();
  }, []);
  function FilterByDate(dates) {
    const fromdate = moment(new Date(dates[0]), "DD-MM-YYYY");
    const todate = moment(new Date(dates[1]), "DD-MM-YYYY");

    setStartDate(moment(fromdate).format("DD-MM-YYYY"));
    setEndDate(moment(todate).format("DD-MM-YYYY"));
    var tempRooms = [];
    if (dates[0] === null || dates[1] === null) {
      setDuplicateRooms(rooms);
    } else {
      for (const room of rooms) {
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            const start = moment(booking.startDate, "DD-MM-YYYY");
            const end = moment(booking.endDate, "DD-MM-YYYY");
            console.log(fromdate, todate, moment(todate).isSame(start));
            if (
              !moment(fromdate).isBetween(start, end) &&
              !moment(todate).isBetween(start, end) &&
              !moment(start).isBetween(fromdate, todate) &&
              !moment(end).isBetween(fromdate, todate) &&
              !moment(fromdate).isSame(start) &&
              !moment(todate).isSame(end) &&
              !moment(start).isSame(end) &&
              !moment(todate).isSame(start)
            ) {
              tempRooms.push(room);
            }
          }
        } else {
          tempRooms.push(room);
        }
      }
      setDuplicateRooms(tempRooms);
      setrooms(tempRooms);
    }
  }
  function FilterByType(e) {
    settype(e);
    if (e !== "all") {
      const tempRooms = duplicateRooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setrooms(tempRooms);
    } else {
      setrooms(duplicateRooms);
    }
  }
  function FilterBySearch() {
    var tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setrooms(tempRooms);
  }

  return (
    <div className="container" data-aos ="fade-up">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={FilterByDate} />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={FilterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              FilterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Dulux</option>
          </select>
        </div>
      </div>
      <div className="row mt-5 ">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : (
          <div className="col-md-9">
            <h1>room Length is :{rooms.length}</h1>
            {rooms.map((room) => (
              <div key={room._id} className="mt-2">
                <Room room={room} startDate={startDate} endDate={endDate} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;

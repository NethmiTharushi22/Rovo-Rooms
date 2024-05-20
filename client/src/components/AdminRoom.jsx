import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Tag } from "antd";
function AdminRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rooms, setroom] = useState([]);
  useEffect(() => {
    async function getRooms() {
      try {
        setLoading(true);
        const rooms = await axios.get("/api/rooms/getallrooms");
        console.log("data");
        setroom(rooms.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    }
    getRooms();
  }, []);
  return (
    <div className="col-md-10">
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <div>
            <table className="table table-borderd ">
              <thead className="thead ">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Room Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Rent Per Day</th>
                  <th scope="col">Max Count</th>

                  <th scope="col">Phone number</th>
                </tr>
              </thead>
              <tbody>
                {rooms &&
                  rooms.map((room, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{room._id}</td>
                        <td>{room.name}</td>
                        <td>{room.type}</td>
                        <td>{room.rentperday} LKR</td>
                        <td>{room.maxcount}</td>
                        <td>{room.phonenumber}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRoom;

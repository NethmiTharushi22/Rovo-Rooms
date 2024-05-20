import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Tag } from "antd";
import AdminRoom from "../components/AdminRoom";
import AddRoom from "../components/AddRoom";
function AdminScreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  });
  return (
    <div className="adminSc mt-3 bs">
      <h1>Admin panel</h1>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rooms" key="2">
          <AdminRoom />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add Room" key="3">
          <AddRoom/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="4">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;

export function Bookings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bookings, setbookings] = useState([]);
  useEffect(() => {
    async function getBookings() {
      try {
        setLoading(true);
        const bookings = await axios.get("/api/bookings/getallbookings");
        setbookings(bookings.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    }
    getBookings();
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
                  <th scope="col">Room Name</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Payment Id</th>

                  <th scope="col">Booking Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings &&
                  bookings.map((booking, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{booking.room}</td>
                        <td>{booking.startDate}</td>
                        <td>{booking.endDate}</td>
                        <td>{booking.totalamount} LKR</td>
                        <td>{booking.transactionId}</td>
                        <td>
                          {booking.isBooked ? (
                            <Tag color="green">Active</Tag>
                          ) : (
                            <Tag color="red">Canceled</Tag>
                          )}
                        </td>
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
export function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setusers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true);
        const users = await axios.get("/api/users/getallusers");
        console.log("data");
        setusers(users.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    }
    getUsers();
  }, []);
  return (
    <div className="col-md-10">
      <div>
        <h1>Users</h1>
        <table className="table table-borded">
          <thead className="thead ">
            <tr>
              <td>User Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Is admin</td>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

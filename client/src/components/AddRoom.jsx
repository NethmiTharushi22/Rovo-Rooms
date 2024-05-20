import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

function AddRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setname] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [maxcount, setmaxcount] = useState("");
  const [description, setdescription] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [type, settype] = useState("");
  const [imageurl1, setimageurl1] = useState("");
  const [imageurl2, setimageurl2] = useState("");
  const [imageurl3, setimageurl3] = useState("");
  async function addRoom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };
    try {
      setLoading(true);
      const result = (await axios.post("/api/rooms/addRoom", newroom)).data;
      console.log(result);
      Swal.fire(
        "Congratulations",
        "You have successfully added a new room",
        "success"
      ).then((result) => {
        window.location.href = "/home";
      });
      setLoading(false);
    } catch (error) {
      setError(true);
      Swal.fire("Error", "somethig went wrong", "error");

      setLoading(false);

      console.log(error);
    }
  }
  return (
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Room Name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Rent Per Day"
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="MaxCount"
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="description"
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="phonenumber"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="type"
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image Url 1 "
          value={imageurl1}
          onChange={(e) => {
            setimageurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image Url 2 "
          value={imageurl2}
          onChange={(e) => {
            setimageurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="image Url 3"
          value={imageurl3}
          onChange={(e) => {
            setimageurl3(e.target.value);
          }}
        />

        <button className="btn btn-primary mt -2" onClick={addRoom}>
          Add Room
        </button>
      </div>
    </div>
  );
}

export default AddRoom;

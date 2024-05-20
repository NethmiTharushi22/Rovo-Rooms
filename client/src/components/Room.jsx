import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function Room({ room, startDate, endDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} alt="{room.name}" className="smallImg" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <p>Max Count:{room.maxcount}</p>
        <p>Phone Number:{room.phonenumber}</p>
        <p>Type:{room.type}</p>
        <div style={{ float: "right" }}>
        {startDate && endDate && (
            <Link to={`/book/${room._id}/${startDate}/${endDate}`}>
              <button className="btn  btn-primary m-2 ">Book Now</button>
            </Link>
          )}
          <button className="btn  btn-primary " onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="bigImg" src={url} alt="room imges" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
export default Room;

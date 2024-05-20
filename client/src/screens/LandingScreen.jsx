import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 2000 });
function LandingScreen() {
  return (
    <div>
      <div className="row landing justify-content-center">
        <div
          className="col-md-9 my-auto text-center"
          style={{ borderRight: "6px solid white" }}
        >
          <h1 data-aos="zoom-in-down">RovoRooms</h1>
          <h2 data-aos="zoom-out">There is only one boss.The Guest</h2>

          <Link to="/home">
            <button className="btn btn-primary landingbtn">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingScreen;

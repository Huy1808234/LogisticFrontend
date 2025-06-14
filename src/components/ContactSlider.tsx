import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/img/hero/about.jpg";

const ContactSlider: React.FC = () => {
  return (
    <div className="slider-area">
      <div
        className="single-slider hero-overly slider-height2 d-flex align-items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="hero-cap">
                <h2>Contact Us</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Contact
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSlider;

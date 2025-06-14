import React from 'react';
import { Link } from 'react-router-dom';
import aboutHeroImg from '../assets/img/hero/about.jpg'; // ← import ảnh

const AboutHero: React.FC = () => {
  return (
    <div className="slider-area">
      <div
        className="single-slider hero-overly slider-height2 d-flex align-items-center"
        style={{ backgroundImage: `url(${aboutHeroImg})` }} // ← dùng ảnh đã import
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="hero-cap">
                <h2>About us</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      About
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

export default AboutHero;

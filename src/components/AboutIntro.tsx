import React from 'react';
import aboutImg1 from '../assets/img/gallery/about1.png';
import aboutImg2 from '../assets/img/gallery/about2.png';
import { Link } from 'react-router-dom';

const AboutIntro: React.FC = () => {
  return (
    <div className="about-low-area section-padding30">
      <div className="container">
        <div className="row">
          {/* Text content */}
          <div className="col-lg-6 col-md-12">
            <div className="about-caption mb-50">
              <div className="section-tittle mb-35">
                <span>About Our Company</span>
                <h2>Safe Logistic & Transport Solutions That Saves our Valuable Time!</h2>
              </div>
              <p>
                Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for cular ts with unlimited customization possibilities.
              </p>
              <p>
                Brook presents your services with flexible, convenient and multipurpose layouts. You can select your favorite layouts.
              </p>
              <Link to="/about" className="btn">More About Us</Link>
            </div>
          </div>

          {/* Image content */}
          <div className="col-lg-6 col-md-12">
            <div className="about-img">
              <div className="about-font-img">
                <img src={aboutImg2} alt="About Front" />
              </div>
              <div className="about-back-img d-none d-lg-block">
                <img src={aboutImg1} alt="About Background" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutIntro;

// src/components/AboutSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import about2 from '../assets/img/gallery/about2.png';

const AboutSection: React.FC = () => (
  <div className="about-low-area padding-bottom">
    <div className="container">
      <div className="row">
        {/* Text content */}
        <div className="col-lg-6 col-md-12">
          <div className="about-caption mb-50">
            <div className="section-tittle mb-35">
              <span>About Our Company</span>
              <h2>Safe Logistic & Transport Solutions That Saves our Valuable Time!</h2>
            </div>
            <p>Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for particular use with unlimited customization.</p>
            <p>Brook presents your services with flexible, convenient multipurpose layouts. Select your favorite layout.</p>
            <Link to="/about" className="btn">More About Us</Link>
          </div>
        </div>

        {/* Image content */}
        <div className="col-lg-6 col-md-12">
          <div className="about-img">
            <div className="about-font-img">
              <img src={about2} alt="Foreground" />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
);

export default AboutSection;

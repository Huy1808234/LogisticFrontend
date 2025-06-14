// src/components/InfoArea.tsx
import React from 'react';

const InfoArea: React.FC = () => (
  <div className="our-info-area pt-70 pb-40">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="single-info mb-30">
            <div className="info-icon">
              <span className="flaticon-support"></span>
            </div>
            <div className="info-caption">
              <p>Call Us Anytime</p>
              <span>+ (123) 1800-567-8990</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="single-info mb-30">
            <div className="info-icon">
              <span className="flaticon-clock"></span>
            </div>
            <div className="info-caption">
              <p>Sunday CLOSED</p>
              <span>Mon - Sat 8.00 - 18.00</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="single-info mb-30">
            <div className="info-icon">
              <span className="flaticon-place"></span>
            </div>
            <div className="info-caption">
              <p>Columbia, SC 29201</p>
              <span>USA, New York - 10620</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default InfoArea;

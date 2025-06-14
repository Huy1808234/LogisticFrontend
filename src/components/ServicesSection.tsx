import React from 'react';
import { Link } from 'react-router-dom';

const ServicesSection: React.FC = () => {
  return (
    <div className="categories-area section-padding30">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {/* Section Title */}
            <div className="section-tittle text-center mb-80">
              <span>Our Services</span>
              <h2>What We Can Do For You</h2>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Land Transport */}
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-cat text-center mb-50">
              <div className="cat-icon">
                <span className="flaticon-shipped"></span>
              </div>
              <div className="cat-cap">
                <h5>
                  <Link to="/services">Land Transport</Link>
                </h5>
                <p>The sea freight service has grown considerably in recent years. We spend time getting to know your processes.</p>
              </div>
            </div>
          </div>

          {/* Ship Transport */}
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-cat text-center mb-50">
              <div className="cat-icon">
                <span className="flaticon-ship"></span>
              </div>
              <div className="cat-cap">
                <h5>
                  <Link to="/services">Ship Transport</Link>
                </h5>
                <p>The sea freight service has grown considerably in recent years. We spend time getting to know your processes.</p>
              </div>
            </div>
          </div>

          {/* Air Transport */}
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-cat text-center mb-50">
              <div className="cat-icon">
                <span className="flaticon-plane"></span>
              </div>
              <div className="cat-cap">
                <h5>
                  <Link to="/services">Air Transport</Link>
                </h5>
                <p>The sea freight service has grown considerably in recent years. We spend time getting to know your processes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;

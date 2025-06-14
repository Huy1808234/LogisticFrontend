import React from 'react';
import bgImage from '../assets/img/gallery/section_bg04.jpg';
import testiImg from '../assets/img/gallery/Homepage_testi.png';

const testimonials = [
  {
    message:
      'Srem ipsum adolor dfsit amet, consectetur adipiscing elit, sed dox beiusmod tempor incci didunt ut labore et dolore magna aliqua. Quis cipsucm suspendisse ultrices gravida. Risus commodo vivercra maecenas accumsan lac.',
    name: 'Jhaon smith',
    role: 'Creative designer',
    image: testiImg,
  },
  {
    message:
      'Srem ipsum adolor dfsit amet, consectetur adipiscing elit, sed dox beiusmod tempor incci didunt ut labore et dolore magna aliqua. Quis cipsucm suspendisse ultrices gravida. Risus commodo vivercra maecenas accumsan lac.',
    name: 'Jhaon smith',
    role: 'Creative designer',
    image: testiImg,
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <div
      className="testimonial-area testimonial-padding section-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container">
        <div className="row justify-content-between">
          {/* Testimonials */}
          <div className="col-xl-7 col-lg-7">
            <div className="section-tittle section-tittle2 mb-25">
              <span>Clients Testimonials</span>
              <h2>What Our Clients Say!</h2>
            </div>

            <div className="h1-testimonial-active mb-70">
              {testimonials.map((item, index) => (
                <div className="single-testimonial" key={index}>
                  <div className="testimonial-caption">
                    <div className="testimonial-top-cap">
                      <p>{item.message}</p>
                    </div>
                    <div className="testimonial-founder d-flex align-items-center">
                      <div className="founder-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="founder-text">
                        <span>{item.name}</span>
                        <p>{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right-side Form */}
          <div className="col-xl-4 col-lg-5 col-md-8">
            <div className="testimonial-form text-center">
              <h3>Always listening, always understanding.</h3>
              <input type="text" placeholder="Incoterms" />
              <button name="submit" className="submit-btn">Request a Quote</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;

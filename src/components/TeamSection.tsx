import React from 'react';
import team1 from '../assets/img/gallery/team1.png';
import team2 from '../assets/img/gallery/team2.png';
import team3 from '../assets/img/gallery/team3.png';

const teamMembers = [
  {
    name: 'Mancherwan Kolin',
    role: 'Health agent',
    image: team1,
    socials: ['facebook-f', 'twitter', 'globe', 'instagram'],
  },
  {
    name: 'Mancherwan Kolin',
    role: 'Health agent',
    image: team2,
    socials: ['facebook-f', 'twitter', 'globe', 'instagram'],
  },
  {
    name: 'Mancherwan Kolin',
    role: 'Health agent',
    image: team3,
    socials: ['facebook-f', 'twitter', 'globe', 'instagram'],
  },
];

const TeamSection: React.FC = () => {
  return (
    <div className="team-area section-padding30">
      <div className="container">
        <div className="row justify-content-center">
          <div className="cl-xl-7 col-lg-8 col-md-10">
            <div className="section-tittle text-center mb-70">
              <span>Our Team Members</span>
              <h2>What We Can Do For You</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
              <div className="single-team mb-30 text-center">
                <div className="team-img">
                  <img src={member.image} alt={member.name} />
                  <div className="team-caption">
                    <h3><a href="#">{member.name}</a></h3>
                    <p>{member.role}</p>
                    <div className="team-social">
                      <ul>
                        {member.socials.map((icon, idx) => (
                          <li key={idx}>
                            <a href="#"><i className={`fab fa-${icon}`}></i></a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;

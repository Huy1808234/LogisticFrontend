import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/img/logo/logo.png';

const Header = () => {
  const [contact, setContact] = useState<{ phone: string; email: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:3001/api/users/me', { withCredentials: true })
      .then((res) => {
        setContact(res.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setContact(null);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setContact(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header>
      <div className="header-area">
        <div className="main-header">
          {/* Header Top */}
          <div className="header-top d-none d-lg-block">
            <div className="container">
              <div className="col-xl-12">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="header-info-left">
                    <ul>
                      <li>Phone: {contact?.phone || '+99 (0) 101 0000 888'}</li>
                      <li>Email: {contact?.email || 'noreply@yourdomain.com'}</li>
                    </ul>
                  </div>
                  <div className="header-info-right">
                    <ul className="header-social">
                      <li><a href="https://x.com/home"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://www.linkedin.com/"><i className="fab fa-linkedin-in"></i></a></li>
                      <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Header Bottom */}
          <div className="header-bottom header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2">
                  <div className="logo">
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                  </div>
                </div>

                <div className="col-xl-10 col-lg-10">
                  <div className="menu-wrapper d-flex align-items-center justify-content-end">
                    <div className="main-menu d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
                          <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
                          <li>
                            <Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>Blog</Link>
                            <ul className="submenu">
                              <li><Link to="/blog">Blog</Link></li>
                              <li><Link to="/blog-details">Blog Details</Link></li>
                              <li><Link to="/elements">Element</Link></li>
                            </ul>
                          </li>
                          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
                          <li><Link to="/profile" className={location.pathname === '/contact' ? 'active' : ''}>Profile</Link></li>
                          
                          {!isLoggedIn ? (
                            <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
                          ) : (
                            <li>
                              <Link to="#" onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                              }}>Logout</Link>
                            </li>
                          )}
                        </ul>
                      </nav>
                    </div>
                    <div className="header-right-btn d-none d-lg-block ml-20">
                      <Link to="/createorderpage" className="btn header-btn">Create Order</Link>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;

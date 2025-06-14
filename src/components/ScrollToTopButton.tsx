import React, { useEffect, useState } from 'react';

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    left: '30px',
    bottom: '30px',
    zIndex: 999,
    backgroundColor: '#ff5f13',
    color: '#fff',
    padding: '12px 14px',
    borderRadius: '50%',
    fontSize: '18px',
    cursor: 'pointer',
    opacity: visible ? 1 : 0,
    visibility: visible ? 'visible' : 'hidden',
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <div
      style={buttonStyle}
      onClick={scrollToTop}
      title="Go to Top"
    >
      <i className="fas fa-level-up-alt" />
    </div>
  );
};

export default ScrollToTopButton;

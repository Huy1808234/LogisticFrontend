// src/components/Preloader.tsx
import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import loderImg from '../assets/img/logo/loder.jpg';

const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500); // sau 1.5 giây ẩn
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader-active">
      <div className="preloader d-flex align-items-center justify-content-center">
        <div className="preloader-inner position-relative">
          <div className="preloader-circle"></div>
          <div className="preloader-img pere-text">
            <img src={loderImg} alt="preloader" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

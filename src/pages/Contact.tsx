// src/pages/Home.tsx
import React from 'react';
import Layout from '../layouts/Layout';
import ContactSlider from '../components/ContactSlider';
import ContactSection from '../components/ContactSection';
const Contact: React.FC = () => {
  return (
    <Layout>
   <ContactSlider/>
   <ContactSection/>
    </Layout>
  );
};

export default Contact;

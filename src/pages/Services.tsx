// src/pages/Home.tsx
import React from 'react';
import Layout from '../layouts/Layout';
import ServicesSection from '../components/ServicesSection';

const Services: React.FC = () => {
  return (
    <Layout>
      <ServicesSection />
    </Layout>
  );
};

export default Services;

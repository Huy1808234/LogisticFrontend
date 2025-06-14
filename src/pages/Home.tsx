// src/pages/Home.tsx
import React from 'react';
import Layout from '../layouts/Layout';
import SliderArea from '../components/SliderArea';
import InfoArea from '../components/InfoArea';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection'; 
import ContactForm from '../components/ContactForm';   
import TeamSection from '../components/TeamSection';
import TestimonialSection from '../components/TestimonialSection';
import BlogSection from '../components/BlogSection';
const Home: React.FC = () => {
  return (
    <Layout>
      <SliderArea />
      <InfoArea />
      <ServicesSection />
      <AboutSection />
      <ContactForm />
      <TeamSection/>
      <TestimonialSection/>
      <BlogSection/>
    </Layout>
  );
};

export default Home;

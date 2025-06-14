import React from "react";
import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import Layout from "../layouts/Layout";
 import ContactForm from "../components/ContactForm";
 import TeamSection from "../components/TeamSection";
import TestimonialSection from "../components/TestimonialSection";
import BlogSection from "../components/BlogSection";


const About: React.FC = () => {
  return (
    <Layout>
      <AboutHero />
      <AboutIntro />
     <ContactForm />
      <TeamSection />
      <TestimonialSection />
      <BlogSection /> 
    </Layout>
  );
};

export default About;

// src/layouts/Layout.tsx
import React from "react";
import Header from "../components/Header";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";
import Chatbox from "../components/Chatbox";
import ScrollToTopButton from "../components/ScrollToTopButton";
type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Preloader />
      <Header />
      <main>{children}</main>
      <Chatbox />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Layout;

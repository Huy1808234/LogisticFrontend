// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateOrderPage from "./pages/CreateOrderPage";
import OrderThankYou from "./pages/OrderThankYou";
import axios from "axios";
// import Blog from './pages/Blog';
// import BlogDetails from './pages/BlogDetails';
// import Elements from './pages/Elements';
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import OrderDetailPage from "./pages/OrderDetailPage";
import "./App.css";
import Login from "./pages/Login";

axios.defaults.withCredentials = true;
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/orders/thankyou" element={<OrderThankYou />} />
        {/* /* // <Route path="/blog" element={<Blog />} />
        // <Route path="/blog-details" element={<BlogDetails />} />
        // <Route path="/elements" element={<Elements />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders/:code" element={<OrderDetailPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/createorderpage" element={<CreateOrderPage />} />
      </Routes>
    </Router>
  );
};

export default App;

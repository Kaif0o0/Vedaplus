import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import Terms from './pages/Terms';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="appLayout">
        <ScrollToTop />
        <Navbar />
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} />
            <Route path="/services" element={<Home />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/terms-conditions" element={<Terms />} />
            <Route path="/termsandconditions" element={<Terms />} />
            <Route path="/terms-and-condition" element={<Terms />} />
            <Route path="/terms-condition" element={<Terms />} />
            <Route path="/termsandcondition" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

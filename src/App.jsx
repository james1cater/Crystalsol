import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CollectionSection from './components/CollectionSection';
import MeaningSection from './components/MeaningSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import AnimatedFooter from './components/AnimatedFooter';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import "./index.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="App">
      {/* Original Aqeeq Website Sections */}
      <section id="hero">
        <HeroSection scrollProgress={scrollYProgress} />
      </section>
      <AboutSection scrollProgress={scrollYProgress} />
      <section id="collection">
        <CollectionSection scrollProgress={scrollYProgress} />
      </section>
      <MeaningSection scrollProgress={scrollYProgress} />
      <section id="gallery">
        <GallerySection scrollProgress={scrollYProgress} />
      </section>
      <AnimatedFooter />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CursorTrail>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </CursorTrail>
    </Router>
  );
}

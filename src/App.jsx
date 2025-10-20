import React, { useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CollectionSection from './components/CollectionSection';
import MeaningSection from './components/MeaningSection';
import GallerySection from './components/GallerySection';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import AnimatedFooter from './components/AnimatedFooter';
import "./index.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <CursorTrail>
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
        <section id="visit">
          <VisitSection scrollProgress={scrollYProgress} />
        </section>
        <AnimatedFooter />
      </div>
    </CursorTrail>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { motion, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Sparkles, Menu, X, Instagram, Mail, Phone } from "lucide-react";
import { useCursor } from "./CursorTrail";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ scrollProgress }) {
  const { setCursorType } = useCursor();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [isFullGradient, setIsFullGradient] = useState(true);

  // Enhanced parallax effects
  const y = useTransform(scrollProgress, [0, 0.2], [0, 100]);
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.2], [1, 0.5, 0]);
  const scale = useTransform(scrollProgress, [0, 0.2], [1, 0.95]);

  // Additional parallax layers
  const yBg1 = useTransform(scrollProgress, [0, 0.3], [0, -50]);
  const yBg2 = useTransform(scrollProgress, [0, 0.3], [0, -100]);
  const yBg3 = useTransform(scrollProgress, [0, 0.3], [0, -150]);
  const yLogo = useTransform(scrollProgress, [0, 0.2], [0, -30]);
  const yText = useTransform(scrollProgress, [0, 0.2], [0, -60]);





  const handleTitleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  // Letter-by-letter animation
  const title = "Crystals of Luxury";

  // GSAP animations
  useEffect(() => {
    // Animate background elements with GSAP
    const bgElements = gsap.utils.toArray('.bg-element');
    bgElements.forEach((element, index) => {
      gsap.fromTo(element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.3,
          scale: 1,
          duration: 2,
          delay: index * 0.2,
          ease: "power2.out"
        }
      );
    });

    // Scroll-triggered logo animation
    gsap.fromTo(".logo-container",
      { rotation: -10, scale: 0.9 },
      {
        rotation: 0,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".logo-container",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Staggered text reveal
    const titleLetters = gsap.utils.toArray('.title-letter');
    gsap.fromTo(titleLetters,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".title-container",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax effect for content
    gsap.to(".hero-content", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section"
    >
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/image.png" alt="Logo" className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold text-white">Crystals of Luxury</span>
            </motion.div>

            {/* Desktop Navigation and Social on the right */}
            <div className="ml-auto hidden md:flex items-center space-x-8">
              <motion.button
                onClick={() => scrollToSection('hero')}
                className="text-white/80 hover:text-amber-400 transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('collection')}
                className="text-white/80 hover:text-amber-400 transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Collection
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('gallery')}
                className="text-white/80 hover:text-amber-400 transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Gallery
              </motion.button>
              <div className="flex items-center space-x-4">
                <motion.a
                  href="https://www.instagram.com/crystals.of.luxury_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-amber-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:crystalsofluxury@gmail.com"
                  className="text-white/80 hover:text-amber-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="py-4 space-y-4">
              <motion.button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left text-white/80 hover:text-amber-400 transition-colors duration-300 font-medium py-2"
                whileHover={{ x: 10 }}
              >
                Home
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('collection')}
                className="block w-full text-left text-white/80 hover:text-amber-400 transition-colors duration-300 font-medium py-2"
                whileHover={{ x: 10 }}
              >
                Collection
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left text-white/80 hover:text-amber-400 transition-colors duration-300 font-medium py-2"
                whileHover={{ x: 10 }}
              >
                Gallery
              </motion.button>
              <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                <motion.a
                  href="https://www.instagram.com/crystals.of.luxury_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-amber-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:crystalsofluxury@gmail.com"
                  className="text-white/80 hover:text-amber-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Background Layer 1 - Slowest */}
        <motion.div
          style={{ y: yBg1 }}
          className="absolute inset-0 opacity-20 bg-element"
        >
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl bg-element"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Background Layer 2 - Medium */}
        <motion.div
          style={{ y: yBg2 }}
          className="absolute inset-0 opacity-25 bg-element"
        >
          <motion.div
            className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl bg-element"
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Background Layer 3 - Fastest */}
        <motion.div
          style={{ y: yBg3 }}
          className="absolute inset-0 opacity-30 bg-element"
        >
          <motion.div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl bg-element"
            animate={{
              x: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Content with parallax */}
      <motion.div style={{ y }} className="relative z-10 text-center px-6 max-w-5xl mx-auto hero-content">
        {/* Logo with glow effect */}
        <motion.div
          style={{ y: yLogo }}
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="mb-12 logo-container"
        >
          <div className="inline-block relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-500 rounded-full blur-2xl opacity-40"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-8 inline-block morphing-bg">
              <motion.div
                className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src="/image copy 9.png" alt="Logo" className="w-28 h-28 md:w-48 md:h-48 object-contain diamond-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 title-container"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
          style={{
            y: yText,
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mask: mousePos ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)` : (isFullGradient ? `radial-gradient(circle 1000px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)` : `radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)`),
            WebkitMask: mousePos ? `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)` : (isFullGradient ? `radial-gradient(circle 1000px at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)` : `radial-gradient(circle 0px at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)`),
            transition: 'mask 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-mask 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
          onMouseMove={handleTitleMouseMove}
          onMouseEnter={() => {
            setMousePos({ x: 0, y: 0 });
            setIsFullGradient(false);
          }}
          onMouseLeave={() => {
            setMousePos(null);
            setTimeout(() => setIsFullGradient(true), 100);
          }}
        >
          {title.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block title-letter"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1 + letterIndex * 0.1 }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-2xl md:text-3xl text-amber-300 mb-4 font-light tracking-wide"
          style={{
            y: yText,
            fontFamily: 'Georgia, serif'
          }}
        >
          Elegance in Every Stone
        </motion.p>



        {/* CTA Button */}
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <motion.button
            onClick={scrollToCollection}
            onMouseEnter={() => setCursorType('button')}
            onMouseLeave={() => setCursorType('default')}
            className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-10 py-6 text-lg rounded-full shadow-2xl transition-all duration-500 group glitch neon-glow"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center">
              Explore the Collection
              <motion.div
                className="ml-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-amber-400" />
        </motion.div>
      </motion.div>


    </motion.section>
  );
}

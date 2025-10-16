import React, { useState, useEffect, useRef } from "react";
import { motion, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import { ChevronDown, Sparkles, Menu, X, Instagram, Mail, Phone } from "lucide-react";
import { useCursor } from "./CursorTrail";

export default function HeroSection({ scrollProgress }) {
  const { setCursorType } = useCursor();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Parallax effects
  const y = useTransform(scrollProgress, [0, 0.2], [0, 100]);
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.2], [1, 0.5, 0]);
  const scale = useTransform(scrollProgress, [0, 0.2], [1, 0.95]);

  // Mouse interaction for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
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

  // Word-by-word animation
  const words = "Crystals of Luxury".split(" ");

  return (
    <motion.section
      style={{ opacity, scale, rotateX, rotateY }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
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
              <Sparkles className="w-8 h-8 text-amber-400" />
              <span className="text-xl font-bold text-white">Crystals of Luxury</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
              <motion.button
                onClick={() => scrollToSection('visit')}
                className="text-white/80 hover:text-amber-400 transition-colors duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Visit
              </motion.button>
            </div>

            {/* Contact Info & Social */}
            <div className="hidden md:flex items-center space-x-4">
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
              <motion.button
                onClick={() => scrollToSection('visit')}
                className="block w-full text-left text-white/80 hover:text-amber-400 transition-colors duration-300 font-medium py-2"
                whileHover={{ x: 10 }}
              >
                Visit
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
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
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
          <motion.div
            className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
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
          <motion.div
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl"
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
        </div>
      </div>

      {/* Content with parallax */}
      <motion.div style={{ y }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Logo with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="mb-12"
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
                <Sparkles className="w-20 h-20 md:w-32 md:h-32 text-amber-400 diamond-pulse" strokeWidth={1} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Brand Name - Scroll-triggered animation with rainbow effect */}
        <motion.div
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight rainbow-text"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="inline-block mr-4">
            {'Crystals'.split('').map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: letterIndex * 0.05 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
          <span className="inline-block mr-4">
            {'of'.split('').map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: (letterIndex + 7) * 0.05 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
          <span className="inline-block">
            {'Luxury'.split('').map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: (letterIndex + 9) * 0.05 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-2xl md:text-3xl text-amber-300 mb-4 font-light tracking-wide"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Elegance in Every Stone
        </motion.p>

        {/* Subtitle with word-by-word reveal */}
        <motion.p
          ref={subtitleRef}
          className="text-lg md:text-xl text-blue-200 mb-12 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {"Handcrafted Aqeeq jewelry that carries tradition, meaning, and timeless beauty".split(' ').map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* CTA Button */}
        <motion.div
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

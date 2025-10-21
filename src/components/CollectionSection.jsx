import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "./CursorTrail";

// Import images directly
import img8 from '/image copy 8.png';
import img6 from '/image copy 6.png';
import img3 from '/image copy 3.png';
import img4 from '/image copy 4.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function CollectionSection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { setCursorType } = useCursor();
  const cardsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.2, 0.4], [-30, 30]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.2, 0.4], [0, -15]);

  // GSAP animations
  useEffect(() => {
    // Staggered card entrance
    const cards = gsap.utils.toArray('.collection-card');
    gsap.fromTo(cards,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".collection-grid",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Image hover effects with GSAP
    cards.forEach((card) => {
      const image = card.querySelector('.collection-image');
      const overlay = card.querySelector('.collection-overlay');

      card.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.1, duration: 0.5, ease: "power2.out" });
        gsap.to(overlay, { opacity: 1, duration: 0.3 });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(overlay, { opacity: 0, duration: 0.3 });
      });
    });

    // Title animation
    gsap.fromTo(".collection-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".collection-title",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const items = [
    { title: "Multicolor Bonsai Tree", desc: "gemstone display tree", img: img4 },
    { title: "Agate bracelet", desc: "Handcrafted Gem Band", img: img6 },
    { title: "Orgonite pyramid", desc: "resin art pyramid", img: img3 },
  ];

  return (
    <motion.section
      id="collection"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        style={{ y: yContent }}
        className="relative max-w-7xl mx-auto px-6 z-10"
      >
        {/* Modern glassmorphism container */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4 bg-gradient-to-r from-amber-400 via-blue-400 to-amber-400 bg-clip-text text-transparent collection-title"
          >
            Our Collection
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-32 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-12 rounded-full shadow-lg"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-blue-100 text-center mb-16 font-light max-w-3xl mx-auto"
          >
            Explore our variety of agate collection, ranging from bracelets, to orgonite pyramids to delicately crafted agate trees
          </motion.p>

          {/* Improved grid layout */}
          <motion.div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 collection-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.7 + idx * 0.2 }}
                className="group cursor-pointer collection-card"
                onMouseEnter={() => setCursorType('image')}
                onMouseLeave={() => setCursorType('default')}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  rotateX: 5
                }}
                whileHoverTransition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-amber-500/30 transition-all duration-500"
                  whileHover={{ boxShadow: "0 35px 60px -12px rgba(251, 191, 36, 0.4)" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-80 lg:h-96 object-cover collection-image"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 collection-overlay"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    {/* Enhanced hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 collection-overlay"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    />
                  </div>
                  <div className="p-6">
                    <motion.h3
                      className="font-bold text-xl text-white mb-2 group-hover:text-amber-400 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className="text-blue-200 font-light"
                      whileHover={{ color: "#93c5fd" }}
                    >
                      {item.desc}
                    </motion.p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-amber-900 font-medium bg-amber-200 px-3 py-1 rounded-full">Premium</span>
                      <motion.div
                        className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-white text-xs font-bold">★</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

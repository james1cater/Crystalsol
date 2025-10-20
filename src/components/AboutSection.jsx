import React, { useRef, useEffect } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Users, Gem } from "lucide-react";
import { useCursor } from "./CursorTrail";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { setCursorType } = useCursor();
  const iconsRef = useRef(null);

  const yBg1 = useTransform(scrollProgress || { current: 0 }, [0.1, 0.3], [-50, 50]);
  const yBg2 = useTransform(scrollProgress || { current: 0 }, [0.1, 0.3], [50, -50]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.1, 0.3], [0, -20]);

  // GSAP animations
  useEffect(() => {
    // Animate icons with GSAP stagger
    const icons = gsap.utils.toArray('.about-icon');
    gsap.fromTo(icons,
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".about-icons",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Text reveal animation
    gsap.fromTo(".about-text",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Container morphing effect
    gsap.fromTo(".about-container",
      { borderRadius: "0%" },
      {
        borderRadius: "3rem",
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".about-container",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-bl from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        style={{ y: yContent }}
        className="relative max-w-6xl mx-auto text-center px-6 z-10"
      >
        {/* Glassmorphism container */}
        <div className="backdrop-blur-md bg-slate-900/20 border border-white/10 rounded-3xl p-12 shadow-2xl about-container">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block text-amber-900 font-semibold text-sm uppercase tracking-wider mb-4 bg-amber-200 px-4 py-2 rounded-full border border-amber-300"
          >
            Our Story
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-amber-400 via-blue-400 to-amber-400 bg-clip-text text-transparent"
          >
            A Journey of Passion
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-8 rounded-full shadow-lg"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-4xl mx-auto font-light about-text"
          >
            <span className="font-semibold text-amber-400 bg-amber-900/50 px-2 py-1 rounded">Crystals of Luxury</span> began as a vision shared by passionate students preparing for our school's Student Souk event. We chose <span className="font-semibold text-blue-400 bg-blue-900/50 px-2 py-1 rounded">Aqeeq stones</span> for their extraordinary beauty, rarity, and deep cultural significance.
          </motion.p>

          {/* Luxury icons with scroll animation */}
          <motion.div
            ref={iconsRef}
            className="flex justify-center gap-8 mt-12 about-icons"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
              <motion.div
                className="text-center group cursor-pointer about-icon"
                onMouseEnter={() => setCursorType('card')}
                onMouseLeave={() => setCursorType('default')}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-sm text-blue-200 font-medium group-hover:text-amber-400 transition-colors">Passion</p>
              </motion.div>
              <motion.div
                className="text-center group cursor-pointer about-icon"
                onMouseEnter={() => setCursorType('card')}
                onMouseLeave={() => setCursorType('default')}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Gem className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-sm text-blue-200 font-medium group-hover:text-blue-400 transition-colors">Craftsmanship</p>
              </motion.div>
              <motion.div
                className="text-center group cursor-pointer about-icon"
                onMouseEnter={() => setCursorType('card')}
                onMouseLeave={() => setCursorType('default')}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-sm text-blue-200 font-medium group-hover:text-slate-400 transition-colors">Community</p>
              </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

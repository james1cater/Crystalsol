import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { MapPin, Clock, Users, Star } from "lucide-react";

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Floating geometric shapes */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute opacity-10"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          rotate: [0, 360],
          scale: [0.5, 1.5, 0.5],
          x: [0, Math.random() * 100 - 50, 0],
          y: [0, Math.random() * 100 - 50, 0],
        }}
        transition={{
          duration: 20 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {i % 4 === 0 && <div className="w-16 h-16 border-2 border-amber-400 rounded-full" />}
        {i % 4 === 1 && <div className="w-12 h-12 border-2 border-blue-400 rotate-45" />}
        {i % 4 === 2 && <div className="w-20 h-8 border-2 border-purple-400 rounded-lg" />}
        {i % 4 === 3 && <div className="w-10 h-10 border-2 border-green-400 rounded-full" />}
      </motion.div>
    ))}

    {/* Particle system */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute w-1 h-1 bg-gradient-to-r from-amber-400 to-blue-500 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 8 + Math.random() * 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

export default function VisitSection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const infoRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.5, 0.7], [-45, 45]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.5, 0.7], [0, -30]);

  const visitInfo = [
    {
      icon: MapPin,
      title: "Location",
      desc: "Student Souk Event, School Campus",
      detail: "Booth #12 - Main Exhibition Hall"
    },
    {
      icon: Clock,
      title: "Hours",
      desc: "Open Daily",
      detail: "10:00 AM - 8:00 PM"
    },
    {
      icon: Users,
      title: "Experience",
      desc: "Personal Consultation",
      detail: "Meet our artisans & learn about Aqeeq"
    },
    {
      icon: Star,
      title: "Special",
      desc: "Student Souk Exclusive",
      detail: "Limited edition pieces available"
    },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-slate-900">

      {/* Glassmorphism background elements */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-blue-50/20 backdrop-blur-sm"
      />

      {/* Luxury geometric patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/3 w-48 h-48 border border-amber-400 transform rotate-12 parallax-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 border border-blue-400 transform -rotate-12 parallax-float"></div>
      </div>

      {/* Animated Background */}
      <AnimatedBackground />

      <motion.div
        style={{ y: yContent }}
        className="relative max-w-6xl mx-auto px-6"
      >
        {/* Glassmorphism container */}
        <div className="backdrop-blur-md bg-slate-900/20 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4 bg-amber-900/50 px-4 py-2 rounded-full border border-amber-700/50">
              Join Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-amber-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
              Visit Us
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-8 rounded-full shadow-lg"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-blue-100 leading-relaxed text-center mb-16 font-light max-w-4xl mx-auto"
          >
            Join us at the <span className="font-semibold text-amber-700 bg-amber-50/30 px-2 py-1 rounded">Student Souk event</span> to explore our collection of beautiful Aqeeq stones and handcrafted pieces. Experience the story and craftsmanship behind each creation in an intimate setting.
          </motion.p>

          <motion.div
            ref={infoRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {visitInfo.map((info, idx) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                className="text-center group"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  z: 20
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-amber-500/10 transition-all duration-500 group-hover:bg-white/10 morphing-bg">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 gem-particle">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors duration-300 holographic">{info.title}</h3>
                  <p className="text-blue-200 text-sm font-medium mb-1">{info.desc}</p>
                  <p className="text-blue-300 text-xs">{info.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-amber-900/50 to-blue-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg morphing-bg">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 holographic">Ready to Experience Luxury?</h3>
              <p className="text-blue-200 mb-8 font-light">Discover pieces that resonate with your soul and tell your unique story.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300 neon-glow">
                  Find Our Booth
                </button>
                <button className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 glitch">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

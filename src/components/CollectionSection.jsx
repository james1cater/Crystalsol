import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { useCursor } from "./CursorTrail";

export default function CollectionSection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { setCursorType } = useCursor();
  const cardsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.2, 0.4], [-30, 30]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.2, 0.4], [0, -15]);

  const items = [
    { title: "Red Aqeeq", desc: "Bright red, pure energy", img: "https://images.unsplash.com/photo-1574169208507-8437617482de?w=400&q=80" },
    { title: "Blue Aqeeq", desc: "Calm and serene", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80" },
    { title: "White Aqeeq", desc: "Purity and elegance", img: "https://images.unsplash.com/photo-1611085583200-a3b181a88402?w=400&q=80" },
  ];

  return (
    <motion.section
      id="collection"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-slate-900"
    >



      <motion.div
        style={{ y: yContent }}
        className="relative max-w-7xl mx-auto px-6"
      >
        {/* Glassmorphism container */}
        <div className="backdrop-blur-md bg-slate-900/20 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-4 bg-gradient-to-r from-amber-400 via-blue-400 to-amber-400 bg-clip-text text-transparent"
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
            Discover our exquisite selection of handcrafted Aqeeq jewelry, each piece telling a story of elegance and tradition.
          </motion.p>

          <motion.div
            ref={cardsRef}
            className="grid md:grid-cols-3 gap-8"
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
                className="group cursor-pointer flip-card"
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
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-amber-500/20 transition-all duration-500 liquid-metal"
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.25)" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    {/* Hover overlay with glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 crystal-shimmer"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                    />
                  </div>
                  <div className="p-6">
                    <motion.h3
                      className="font-bold text-xl text-white mb-2 group-hover:text-amber-400 transition-colors duration-300 holographic"
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
                        className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center gem-particle"
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-white text-xs font-bold">★</span>
                      </motion.div>
                    </div>
                  </div>
                    </div>
                    <div className="flip-card-back bg-gradient-to-br from-amber-500 to-blue-600 p-6 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-lg mb-4">{item.desc}</p>
                        <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-800 transition-colors border border-white/20">
                          View Details
                        </button>
                      </div>
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

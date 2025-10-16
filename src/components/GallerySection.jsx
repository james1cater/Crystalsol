import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { Eye, Heart } from "lucide-react";

// Floating gem particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-blue-500 rounded-full gem-particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [0.5, 1.2, 0.5]
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 2
        }}
      />
    ))}
  </div>
);

export default function GallerySection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const imagesRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.4, 0.6], [-35, 35]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.4, 0.6], [0, -20]);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500&q=80",
      alt: "Elegant Aqeeq necklace",
      title: "Celestial Harmony",
      desc: "A masterpiece of blue Aqeeq stones"
    },
    {
      src: "https://images.unsplash.com/photo-1574169208507-8437617482de?w=500&q=80",
      alt: "Red Aqeeq bracelet",
      title: "Crimson Elegance",
      desc: "Vibrant red stones in gold setting"
    },
    {
      src: "https://images.unsplash.com/photo-1611085583200-a3b181a88402?w=500&q=80",
      alt: "White Aqeeq ring",
      title: "Pure Serenity",
      desc: "Timeless white Aqeeq craftsmanship"
    },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-slate-900">

      {/* Glassmorphism background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-amber-50/30 backdrop-blur-sm"
      />

      {/* Luxury accent elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-24 h-24 border border-amber-400 rounded-full parallax-float"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-blue-400 rounded-full parallax-float"></div>
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      <motion.div
        style={{ y: yContent }}
        className="relative max-w-7xl mx-auto px-6"
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
              Visual Showcase
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-amber-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
              Gallery
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-32 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-8 rounded-full shadow-lg"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl text-blue-100 font-light max-w-3xl mx-auto"
            >
              Immerse yourself in the breathtaking beauty of our handcrafted Aqeeq collections, where tradition meets contemporary elegance.
            </motion.p>
          </motion.div>

          <motion.div
            ref={imagesRef}
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {images.map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.7 + idx * 0.2 }}
                className="group cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5,
                  z: 50
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-amber-500/20 transition-all duration-500 morphing-bg">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 crystal-shimmer" />

                    {/* Overlay content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-bold text-xl mb-2 holographic">{image.title}</h3>
                      <p className="text-sm opacity-90 mb-4">{image.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm hover:text-amber-300 transition-colors glitch">
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button className="flex items-center gap-1 text-sm hover:text-red-300 transition-colors glitch">
                            <Heart className="w-4 h-4" />
                            Like
                          </button>
                        </div>
                        <span className="text-xs bg-amber-900/80 px-2 py-1 rounded-full neon-glow">Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="text-center mt-16"
          >
            <p className="text-blue-200 mb-6 font-light">Experience the full collection in person</p>
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-amber-500/30 transition-all duration-300">
              Visit Our Booth
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { Eye, Heart, X } from "lucide-react";

const imgCopy = new URL('/image copy.png', import.meta.url).href;
const imgCopy2 = new URL('/image copy 2.png', import.meta.url).href;
const imgCopy3 = new URL('/image copy 3.png', import.meta.url).href;
const imgCopy4 = new URL('/image copy 4.png', import.meta.url).href;
const imgCopy7 = new URL('/image copy 7.png', import.meta.url).href;

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
  const [likedImages, setLikedImages] = useState(new Set());
  const [selectedImage, setSelectedImage] = useState(null);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.4, 0.6], [-35, 35]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.4, 0.6], [0, -20]);

  const images = [
    {
      src: imgCopy,
      alt: "Rose Quartz Tree",
      title: "Rose Quartz Tree",
      desc: "This is a cute little tree made with rose quartz chips for leaves, and it's got a tiny swing hanging from one of the branches. The tree is set on a polished wood slice that's topped with more rose quartz. Its perfect as a decor piece or even a little reminder to slow down and enjoy the moment."
    },
    {
      src: imgCopy2,
      alt: "Citrine Money Tree",
      title: "Citrine Money Tree",
      desc: "This one is your classic 'money tree' with golden wire branches and yellow gemstone chips shaped like leaves. The base is a gold pot, adding to the whole wealth and prosperity symbolism. It's the kind of thing people keep in their homes or offices for good luck, abundance, and positive energy."
    },
    {
      src: imgCopy4,
      alt: "Multicolor Bonsai Tree",
      title: "Multicolor Bonsai Tree",
      desc: "Here you've got a mini bonsai style tree with branches made of mixed crystal chips. It's mounted on a wood slice with crystal chips embedded in resin. This one's great if you're into chakra energy or just love the earthy, vibrant look of natural stones."
    },
    {
      src: imgCopy3,
      alt: "Orgonite Pyramid",
      title: "Orgonite Pyramid",
      desc: "This is an orgonite pyramid made with layered resins, metals, and crystals. The bright yellow top gives it an energy cleansing vibe. People use these to help with EMF protection, grounding energy, or just as striking pieces of spiritual decor."
    },
    {
      src: imgCopy7,
      alt: "Crystal Tree w/ Frame",
      title: "Crystal Tree w/ Frame",
      desc: "This is a tree made of wire and multi-colored crystals, set inside a carved natural wood frame. It has an earthy, rustic look perfect for a nature inspired shelf or altar. The frame gives it a unique feel, almost like a little window into a miniature crystal forest."
    },
  ];

  return (
    <motion.section
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
              Handcrafted Aqeeq collection combines classic designs with a clean and modern look made for anyone who appreciates something real and timeless.
            </motion.p>
          </motion.div>

          <motion.div
            ref={imagesRef}
            className="grid md:grid-cols-3 lg:grid-cols-5 gap-8"
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setSelectedImage(image)}
                            className="flex items-center gap-1 text-sm hover:text-amber-300 transition-colors glitch"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              setLikedImages(prev => {
                                const newSet = new Set(prev);
                                if (newSet.has(idx)) {
                                  newSet.delete(idx);
                                } else {
                                  newSet.add(idx);
                                }
                                return newSet;
                              });
                            }}
                            className={`flex items-center gap-1 text-sm transition-colors glitch ${likedImages.has(idx) ? 'text-red-500' : 'hover:text-red-300'}`}
                          >
                            <Heart className={`w-4 h-4 ${likedImages.has(idx) ? 'fill-current' : ''}`} />
                            Like
                          </button>
                        </div>
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

      {/* Modal for viewing image */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg opacity-90">{selectedImage.desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}

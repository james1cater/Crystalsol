import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { Sparkles, Shield, Heart, Zap } from "lucide-react";

export default function MeaningSection({ scrollProgress }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const contentRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const yBg = useTransform(scrollProgress || { current: 0 }, [0.3, 0.5], [-40, 40]);
  const yContent = useTransform(scrollProgress || { current: 0 }, [0.3, 0.5], [0, -25]);

  const meanings = [
    { icon: Shield, title: "Protection", desc: "Wards off negative energy and provides spiritual protection" },
    { icon: Heart, title: "Harmony", desc: "Promotes inner peace and emotional balance" },
    { icon: Zap, title: "Energy", desc: "Amplifies positive vibrations and creative flow" },
    { icon: Sparkles, title: "Wisdom", desc: "Enhances clarity of thought and decision-making" },
  ];

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
        className="relative max-w-6xl mx-auto px-6 z-10"
      >
        {/* Glassmorphism container */}
        <div className="backdrop-blur-md bg-slate-900/20 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4 bg-amber-900/50 px-4 py-2 rounded-full border border-amber-700/50">
              Spiritual Significance
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-amber-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
              Meaning Behind Aqeeq
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
            Aqeeq stones have been treasured for centuries, symbolizing <span className="font-semibold text-amber-400 bg-amber-900/50 px-2 py-1 rounded">strength</span>, <span className="font-semibold text-blue-400 bg-blue-900/50 px-2 py-1 rounded">protection</span>, <span className="font-semibold text-green-400 bg-green-900/50 px-2 py-1 rounded">positivity</span>, and <span className="font-semibold text-purple-400 bg-purple-900/50 px-2 py-1 rounded">grounding energy</span>. Each piece carries unique energy and patterns that inspire creativity and focus.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {meanings.map((meaning, idx) => (
              <motion.div
                key={meaning.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                className="text-center group"
              >
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-amber-500/10 transition-all duration-500 group-hover:bg-white/10">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <meaning.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">{meaning.title}</h3>
                  <p className="text-blue-200 text-sm font-light leading-relaxed">{meaning.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <blockquote className="text-2xl md:text-3xl text-slate-800 font-light italic max-w-4xl mx-auto leading-relaxed">
              "In the heart of every Aqeeq lies a story of resilience, beauty, and timeless wisdom passed down through generations."
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

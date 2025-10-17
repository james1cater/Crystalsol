import React, { useEffect, useState, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Context for cursor state
export const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export default function CursorTrail({ children }) {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover listeners to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      <motion.div
        className={`fixed pointer-events-none z-50 ${
          isHovering
            ? 'w-12 h-12 border-2 border-amber-400 bg-transparent'
            : 'w-6 h-6 bg-amber-400'
        } rounded-full`}
        style={{
          x: springX,
          y: springY,
          translateX: isHovering ? '-24px' : '-12px',
          translateY: isHovering ? '-24px' : '-12px',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          scale: { duration: 0.2, ease: "easeOut" }
        }}
      />
      {children}
    </CursorContext.Provider>
  );
}

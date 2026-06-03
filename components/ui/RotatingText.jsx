"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The list of words you want to cycle through
const words = ["Arts", "Sciences", "Humanities"];

export default function RotatingText() {
  const [index, setIndex] = useState(0);

  // Cycle through the words automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // Changes every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center w-full justify-center p-10">
      <AnimatePresence>
        <motion.span
          key={words[index]} 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -30 }} 
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute z-10 text-white text-8xl tracking-[0.2em] mb-4 drop-shadow-lg linden-hill-regular"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shirt, Footprints, Watch, Glasses, CloudSun, Sparkles } from "lucide-react";

const loadingStates = [
  { text: "Scanning local weather...", icon: CloudSun },
  { text: "Opening digital wardrobe...", icon: Shirt },
  { text: "Matching colors & vibes...", icon: Sparkles },
  { text: "Finalizing your daily drip...", icon: Glasses },
];

const icons = [Shirt, Watch, Glasses, Footprints];

export default function DripLoader() {
  const [currentState, setCurrentState] = useState(0);
  const [iconIndex, setIconIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % loadingStates.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % icons.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = icons[iconIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center">
        <div className="relative flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-blue-50 border-4 border-blue-100 shadow-lg overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={iconIndex}
              initial={{ y: 40, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ActiveIcon className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
            </motion.div>
          </AnimatePresence>
          <motion.div 
            className="absolute w-full h-1 bg-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          />
        </div>
        <div className="h-12 flex flex-col items-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={currentState}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-lg font-medium text-gray-700 flex items-center gap-2"
                >
                    {React.createElement(loadingStates[currentState].icon, { className: "w-4 h-4 text-blue-500 animate-pulse" })}
                    {loadingStates[currentState].text}
                </motion.p>
            </AnimatePresence>
        </div>
        <div className="w-64 h-1.5 bg-gray-100 rounded-full mt-4 overflow-hidden">
            <motion.div 
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            />
        </div>
      </div>
    </div>
  );
}
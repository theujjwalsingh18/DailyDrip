import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Sparkles,
  MapPin,
  CloudSun,
  Bell,
  UserCheck,
} from "lucide-react";

const icons = [UserCheck, MapPin, CloudSun, Bell];

const steps = [
  {
    id: 1,
    title: "Sign In & Fill Details",
    description:
      "Create your account and enter your basic details to get started.",
  },
  {
    id: 2,
    title: "Choose City or Fetch Live",
    description:
      "Select your city or let us detect it automatically using live location.",
  },
  {
    id: 3,
    title: "Get Daily Forecasts",
    description:
      "Our AI predicts weather and suggests the perfect outfit for your day.",
  },
  {
    id: 4,
    title: "See It Everywhere",
    description:
      "Receive updates via Telegram, Email, or directly on your dashboard.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "linear-gradient(to bottom, #FFFFFF, #93c5fd, #3b82f6)",
      "linear-gradient(to bottom, #93c5fd, #2563eb, #1d4ed8)",
      "linear-gradient(to bottom, #facc15, #9333ea, #581c87)",
      "linear-gradient(to bottom, #020617, #1e293b, #000)",
    ]
  );

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 40;
    const y = (e.clientY - innerHeight / 2) / 40;
    setMouse({ x, y });
  };

  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ background }}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden text-white py-28 px-6 md:px-16 transition-all duration-700 cursor-default"
    >
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/60 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 1, 0.4],
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            translateX: mouse.x / 3,
            translateY: mouse.y / 3,
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto font-rosca italic text-center mb-24 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-200 via-sky-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          🌤️ How It Works
        </motion.h2>
        <p className="text-black text-lg mt-4">
          Scroll through your AI-powered weather journey
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        <div className="absolute left-7 top-0 w-[2px] bg-white/20 rounded-full h-full"></div>
        <motion.div
          className="absolute left-7 top-0 w-[3px] bg-gradient-to-b from-sky-300 to-indigo-500 rounded-full origin-top"
          style={{ height: lineHeight }}
        />
        <div className="space-y-28 ml-16">
          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={step.id}
                className="relative group"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute -left-16 top-0 flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400 shadow-[0_0_15px_rgba(59,130,246,0.7)] ring-4 ring-indigo-500/40 backdrop-blur-sm"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="relative bg-white/10 border border-white/20 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500">
                  <h3 className="text-2xl font-rosca mb-3 bg-gradient-to-r from-indigo-200 to-sky-300 bg-clip-text text-transparent">
                    {step.title}
                  </h3>
                  <p className="text-gray-200">{step.description}</p>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-sky-400/30 transition-all duration-500"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(59,130,246,0)",
                        "0 0 15px rgba(59,130,246,0.4)",
                        "0 0 0px rgba(59,130,246,0)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}


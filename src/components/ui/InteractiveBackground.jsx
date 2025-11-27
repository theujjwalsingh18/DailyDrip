import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

const InteractiveBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };


  const orbs = [
    { size: 400, color: "hsl(199 89% 48%)", opacity: 0.15, speed: 0.02 },
    { size: 350, color: "hsl(24 95% 65%)", opacity: 0.12, speed: 0.015 },
    { size: 300, color: "hsl(340 82% 67%)", opacity: 0.1, speed: 0.025 },
    { size: 500, color: "hsl(199 89% 48%)", opacity: 0.08, speed: 0.01 },
    { size: 250, color: "hsl(24 95% 65%)", opacity: 0.1, speed: 0.03 },
  ];

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-soft"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {orbs.map((orb, i) => {
        const x = useTransform(
          smoothMouseX,
          [0, dimensions.width],
          [i % 2 === 0 ? -50 : 50, i % 2 === 0 ? 50 : -50]
        );
        const y = useTransform(
          smoothMouseY,
          [0, dimensions.height],
          [i % 3 === 0 ? -30 : 30, i % 3 === 0 ? 30 : -30]
        );

        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              opacity: orb.opacity,
              x: i % 2 === 0 ? x : undefined,
              y: i % 3 === 0 ? y : undefined,
              left: `${(i * 23) % 80}%`,
              top: `${(i * 31) % 80}%`,
            }}
            animate={{
              x: i % 2 !== 0 ? [0, 30, 0] : undefined,
              y: i % 3 !== 0 ? [0, -40, 0] : undefined,
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
      {Array.from({ length: 20 }).map((_, i) => {
        const particleX = useTransform(
          smoothMouseX,
          [0, dimensions.width],
          [(i % 5) * 10 - 20, (i % 5) * 10 + 20]
        );

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
              x: particleX,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + (i % 5) * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        );
      })}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(215 25% 27%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(215 25% 27%) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50" />
    </div>
  );
};

export default InteractiveBackground;
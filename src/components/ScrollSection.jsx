import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ScrollSection({ children }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 20%"], 
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        scale,
      }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

import { motion } from "motion/react";

export default function Text() {
  return (
    <motion.p
      className="mt-4 text-2xl font-semibold bg-clip-text text-transparent 
                 bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ backgroundSize: "200% 200%" }}
    >
      No spam. Just your morning drip.
    </motion.p>
  );
}

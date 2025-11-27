import React, { useState, forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const AnimatedText = forwardRef((props, ref) => {
  const {
    text,
    gradientColors = "linear-gradient(90deg, #000, #fff, #000)",
    gradientAnimationDuration = 1.5,
    hoverEffect = false,
    className,
    textClassName,
    ...rest
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const textVariants = {
    initial: {
      backgroundPosition: "0 0",
    },
    animate: {
      backgroundPosition: "100% 0",
      transition: {
        duration: gradientAnimationDuration,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div
      ref={ref}
      className={cn("flex justify-center items-center", className)}
      {...rest}
    >
      <motion.h1
        className={cn(
          "font-rosca text-[1rem] sm:text-[1rem] md:text-[1rem] lg:text-[2rem] xl:text-[2rem] leading-normal",
          textClassName
        )}
        style={{
          background: gradientColors,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: isHovered ? "0 0 8px rgba(255,255,255,0.3)" : "none",
        }}
        variants={textVariants}
        initial="initial"
        animate="animate"
        onHoverStart={() => hoverEffect && setIsHovered(true)}
        onHoverEnd={() => hoverEffect && setIsHovered(false)}
      >
        {text}
      </motion.h1>
    </div>
  );
});

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };

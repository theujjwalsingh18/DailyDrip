import { useEffect, useState } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

export const FeatureCard = ({
  data,
  autoplay = false
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + data.length) % data.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      handleNext();
    } else if (offset > 50 || velocity > 500) {
      handlePrev();
    }
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, data.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full px-4 py-12 md:py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
        <div className="w-full flex justify-center">
          <div className="relative h-64 w-full max-w-[300px] md:max-w-none md:h-80 perspective-1000">
            <AnimatePresence mode="popLayout">
              {data.map((testimonial, index) => (
                <motion.div
                  key={testimonial.image}
                  drag={isActive(index) ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  dragDirectionLock={true}
                  onDragEnd={handleDragEnd}

                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : data.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className={`absolute inset-0 origin-bottom touch-action-pan-y ${isActive(index) ? 'cursor-grab active:cursor-grabbing' : ''
                    }`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.description}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 dark:text-blue-300 text-sm font-semibold">
                {data[active].weather}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mt-4">
                {data[active].description}
              </h3>

              <motion.p className="mt-4 text-base md:text-lg text-gray-500 dark:text-neutral-300">
                {"Our AI has carefully selected this outfit based on real-time weather data, ensuring you stay comfortable and stylish throughout the day. Each piece is chosen to match the temperature, humidity, and wind conditions."
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 pt-8 md:pt-12">
            <button
              onClick={handlePrev}
              className="group/button flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-colors dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-colors dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 md:h-6 md:w-6 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
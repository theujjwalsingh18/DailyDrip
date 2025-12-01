import React, { useRef } from "react";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "motion/react";
export function TiltCard({ icon: Icon, title, desc, children, accentColor }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    const mouseXRel = e.clientX - rect.left;
    const mouseYRel = e.clientY - rect.top;
    
    const xPct = mouseXRel / width - 0.5;
    const yPct = mouseYRel / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    mouseX.set(mouseXRel);
    mouseY.set(mouseYRel);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const colorMap = {
    blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white",
    purple: "text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white",
    emerald: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-[420px] w-full rounded-3xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.05),
              transparent 80%
            )
          `,
        }}
      />
      <div 
        style={{ transform: "translateZ(30px)" }} 
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 rounded-3xl bg-white/80 backdrop-blur-[2px]"
      >
         <div>
            <div className={`w-14 h-14 mb-8 flex items-center justify-center rounded-2xl border border-gray-100 transition-all duration-300 shadow-sm ${colorMap[accentColor]}`}>
                <Icon size={28} strokeWidth={1.5} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{title}</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
                {desc}
            </p>
         </div>

         {children}
      </div>

    </motion.div>
  );
}


export function DataBar({ label, percent, color, delay }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <span>{label}</span>
                <span className="text-gray-900">{percent}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: percent }}
                    transition={{ duration: 1, ease: "easeOut", delay }}
                    className={`h-full ${color}`} 
                />
            </div>
        </div>
    );
}
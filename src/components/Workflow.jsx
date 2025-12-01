import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  UserCircle2, 
  MapPin, 
  Cpu, 
  Zap, 
  Sparkles
} from "lucide-react";

const panels = [
  {
    id: 1,
    title: "Profile Sync",
    short: "Identity",
    desc: "We decode your style matrix using AI based on gender, history, and preferences.",
    icon: UserCircle2,
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop",
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 2,
    title: "Geo-Lock",
    short: "Location",
    desc: "Satellite precision detects micro-climates. We know if it's raining on your specific block.",
    icon: MapPin,
    img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000&auto=format&fit=crop",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Neural Core",
    short: "Engine",
    desc: "1,000+ simulations run instantly to match the forecast to your wardrobe database.",
    icon: Cpu,
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    title: "Daily Drip",
    short: "Delivery",
    desc: "Your optimized outfit delivered to Telegram or Dashboard. Ready before you wake up.",
    icon: Zap,
    img: "https://res.cloudinary.com/dfcr2wmux/image/upload/v1764578148/notify_sample_kpwxts.jpg?q=80&w=1000&auto=format&fit=crop",
    color: "",
  },
];

export default function Workflow() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-gray-500 to-black py-24 px-4 md:px-8 overflow-hidden">
      <div className="relative z-10 mb-16 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-300 border border-blue/10 backdrop-blur-md text-xs font-medium text-black/70 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>Workflow Engine</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-rosca text-white tracking-tighter">
          THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400">SYSTEM</span>
        </h2>
        <p className="text-blue-400 font-rosca italic text-lg md:text-xl font-light">
          Explore how intelligence meets style.
        </p>
      </div>

      <div className="relative z-10 mx-auto flex flex-col md:flex-row h-[700px] md:h-[600px] w-full max-w-7xl gap-3">
        {panels.map((panel) => (
          <Panel 
            key={panel.id} 
            panel={panel} 
            activeId={activeId} 
            setActiveId={setActiveId} 
          />
        ))}
      </div>
    </section>
  );
}

function Panel({ panel, activeId, setActiveId }) {
  const isActive = activeId === panel.id;

  return (
    <motion.div
      layout
      onClick={() => setActiveId(panel.id)}
      onHoverStart={() => setActiveId(panel.id)}
      transition={{ type: "spring", stiffness: 200, damping: 25 }} 
      className={`relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 
        ${isActive ? "flex-[4] md:flex-[3]" : "flex-[1] md:flex-[0.5]"} 
        h-full group`}
    >
      <motion.div layout className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-neutral-900 z-0" />
        <img
          src={panel.img}
          alt={panel.title}
          className={`h-full w-full object-cover transition-all duration-1000 ease-out
            ${isActive ? "scale-105 opacity-100 blur-0" : "scale-150 opacity-50 blur-sm grayscale"}`}
        />
        <div 
            className={`absolute inset-0 bg-gradient-to-b ${panel.color} mix-blend-overlay transition-opacity duration-500
            ${isActive ? "opacity-90" : "opacity-0"}`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </motion.div>

      <div className="relative h-full flex flex-col justify-between p-6 md:p-8 z-10 text-white">
        
        <div className="flex items-start justify-between">
            <motion.div 
                layout
                className={`flex items-center justify-center rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500
                ${isActive ? `w-14 h-14 bg-gradient-to-br ${panel.color}` : "w-10 h-10 bg-white/10"}`}
            >
                <panel.icon className={`${isActive ? "w-6 h-6 text-white" : "w-5 h-5 text-white/50"}`} />
            </motion.div>
            
            <div className={`px-3 py-1 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-xs font-mono font-bold transition-colors duration-300 ${isActive ? "text-white" : "text-white/40"}`}>
                0{panel.id}
            </div>
        </div>

        <div className="relative flex-grow">
             
             {!isActive && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center whitespace-nowrap md:-rotate-90"
                >
                    <span className="text-sm md:text-lg font-bold uppercase tracking-[0.2em] text-white/70 shadow-black drop-shadow-md">
                        {panel.short}
                    </span>
                </motion.div>
             )}

            <AnimatePresence mode="wait">
                {isActive && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 space-y-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div variants={itemVariants} className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-white text-black rounded-sm`}>
                                {panel.short}
                            </span>
                            <div className="h-px w-8 bg-white/40" />
                        </motion.div>

                        <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-rosca uppercase leading-[0.9] drop-shadow-lg">
                            {panel.title}
                        </motion.h3>

                        <motion.p variants={itemVariants} className="text-sm md:text-base text-white/80 font-medium leading-relaxed max-w-md">
                            {panel.desc}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};
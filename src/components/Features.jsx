import React from "react";
import { motion } from "motion/react";
import { TiltCard, DataBar } from "./ui/TiltCard";
import { 
  MapPin, 
  Wand2, 
  FileText, 
  Monitor, 
  Mail, 
  Send, 
  ArrowRight,
  Zap
} from "lucide-react";
import { FeatureCard } from "./ui/FeatureCard";
import outfitSunny from "../assets/outfit-sunny.jpg";
import outfitCloudy from "../assets/outfit-cloudy.jpg";
import outfitSnowy from "../assets/outfit-snowy.jpg";

const outfitExamples = [
  {
    weather: "Sunny & 25°C",
    image: outfitSunny,
    description: "Light and breezy for a perfect summer day"
  },
  {
    weather: "Cloudy & 15°C",
    image: outfitCloudy,
    description: "Layered comfort for unpredictable weather"
  },
  {
    weather: "Snowy & -2°C",
    image: outfitSnowy,
    description: "Warm and cozy for winter conditions"
  }
];

export default function FeatureShowcase() {
  return (
    <section className="py-32 px-6 bg-white text-gray-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="mb-24 space-y-6 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm font-bold text-blue-600 tracking-wide"
          >
             <Zap size={14} className="fill-blue-600" />
             <span>Core Intelligence</span>
          </motion.div>
          
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-rosca tracking-tight text-gray-900"
          >
            Your Weather, <br className="md:hidden" />
            <span className="text-blue-400">
               Your Style
            </span>
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl text-gray-500 max-w-2xl leading-relaxed"
          >
            Powered by a neural engine that understands style, comfort, and meteorology simultaneously.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 perspective-1000">
            <TiltCard 
              icon={MapPin}
              title="Hyper-Local"
              desc="Coordinates locked to your exact block. We don't just know the city; we know your street's micro-climate."
              accentColor="blue"
            >
               <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-6">
                  {[Monitor, Mail, Send].map((Icon, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5, color: "#2563eb" }}
                      className="text-gray-400 transition-colors"
                    >
                      <Icon size={24} strokeWidth={1.5} />
                    </motion.div>
                  ))}
               </div>
            </TiltCard>

            <TiltCard 
              icon={Wand2}
              title="AI Stylist"
              desc="The engine processes 50+ variables (humidity, wind chill, UV) to render the perfect fit for right now."
              accentColor="purple"
            >
               <div className="mt-auto pt-8 border-t border-transparent group-hover:border-gray-100 transition-colors duration-500">
                  <button className="flex items-center gap-2 text-sm font-bold text-purple-600 group-hover:text-purple-700 transition-colors">
                    <span>View Matrix</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
          </TiltCard>
          
            <TiltCard 
              icon={FileText}
              title="Smart Context"
              desc="Data with reasoning. We explain *why* you need that jacket, translating raw metrics into comfort."
              accentColor="emerald"
            >
               <div className="mt-8 space-y-4 pt-8 border-t border-gray-100">
                  <DataBar label="Temp Accuracy" percent="92%" color="bg-emerald-500" delay={0} />
                  <DataBar label="Style Match" percent="96%" color="bg-blue-500" delay={0.2} />
               </div>
            </TiltCard>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] border border-gray-200 bg-white shadow-2xl p-8 md:p-12 overflow-hidden"
        >
          <div className="text-center mb-10">
             <h3 className="text-3xl font-rosca text-gray-900 mb-2">The Output</h3>
             <p className="text-gray-500">Real-time generations from the engine.</p>
          </div>

          <FeatureCard data={outfitExamples} />
        </motion.div>
      </div>
    </section>
  );
}
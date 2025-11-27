import React from "react";
import { motion } from "motion/react";
import { Droplets, Wind, Gauge, CloudRain, Sun } from "lucide-react";

export default function WeatherExtras({ data }) {
  const current = data?.current;

  if (!current) return null;

  const cards = [
    {
      label: "Precipitation",
      value: `${current.precipitation} mm`,
      icon: <CloudRain className="text-blue-500" size={24} />
    },
    {
      label: "Pressure",
      value: `${Math.round(current.pressure)} hPa`,
      icon: <Gauge className="text-green-500" size={24} />
    },
    {
      label: "UV Index",
      value: data.daily?.uv_index_max?.[0] || "N/A",
      icon: <Sun className="text-orange-500" size={24} />
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {cards.map((x, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/30 backdrop-blur-lg p-4 rounded-2xl text-center font-rosca border border-white/40 shadow-sm hover:bg-white/50 transition-colors"
        >
          <div className="flex justify-center mb-2 bg-white/50 w-10 h-10 mx-auto items-center rounded-full shadow-inner">
            {x.icon}
          </div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{x.label}</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{x.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
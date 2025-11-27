import React from "react";
import { motion } from "motion/react";
import { Sun, Cloud, CloudRain, Wind, Droplets, MapPin } from "lucide-react";
import useAuth from "@/context/AuthContext";

function getIcon(code) {
  if (code <= 1) return <Sun size={60} className="text-yellow-400" />;
  if (code <= 3) return <Cloud size={60} className="text-gray-400" />;
  if (code >= 50) return <CloudRain size={60} className="text-blue-500" />;
  return <Cloud size={60} className="text-gray-400" />;
}

export default function WeatherCardPro({ data }) {
  const { user } = useAuth();
  const { current, location } = data;

  if (!current) return null;

  const displayCity = location?.city || user?.location?.city || "Unknown Location";
  const displayCountry = location?.country || user?.location?.country || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-white/30 backdrop-blur-xl p-7 rounded-3xl shadow-xl border border-white/40 overflow-hidden min-h-[220px]"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-300/40 rounded-full blur-3xl"></div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          <motion.div 
            initial={{ rotate: -10 }} 
            animate={{ rotate: 0 }} 
            transition={{ duration: 0.4 }}
          >
            {getIcon(current.weather_code)}
          </motion.div>

          <h1 className="text-5xl font-rosca font-bold text-gray-800 mt-3">
            {Math.round(current.temperature)}°
          </h1>

          <p className="text-gray-700 text-sm mt-2 flex items-center gap-1 font-medium">
            <MapPin size={14} className="text-blue-600"/>
            {displayCity}{displayCountry ? `, ${displayCountry}` : ""}
          </p>
          
          <p className="text-gray-500 text-xs mt-1">
            Feels like {Math.round(current.feels_like)}°
          </p>
        </div>

        <div className="flex flex-col items-end gap-4 font-rosca">
          <div className="text-gray-700 space-y-3 bg-white/40 p-4 rounded-2xl border border-white/50 shadow-sm w-32">
            <p className="flex items-center justify-between gap-2 text-sm">
              <Wind size={18} className="text-blue-600" /> 
              <span>{Math.round(current.wind_speed)} <span className="text-[10px] text-gray-500">km/h</span></span>
            </p>
            <p className="flex items-center justify-between gap-2 font-medium text-sm">
              <Droplets size={18} className="text-blue-600" /> 
              <span>{current.humidity}%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-6 flex flex-col items-end opacity-60 hover:opacity-100 transition-opacity">
        <p className="text-[9px] text-gray-500 font-rosca italic tracking-wide uppercase">
          Data Providers
        </p>
        <div className="flex gap-2 text-[9px] text-gray-400">
          <a 
            href="https://open-meteo.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-blue-600 font-rosca italic hover:underline"
          >
            Open-Meteo
          </a>
          <span>•</span>
          <a 
            href="https://www.tomorrow.io/" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-blue-600 font-rosca italic hover:underline"
          >
            Tomorrow.io
          </a>
        </div>
      </div>
    </motion.div>
  );
}
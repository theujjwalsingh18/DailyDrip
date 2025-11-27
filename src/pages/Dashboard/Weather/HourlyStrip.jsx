import React from "react";
import { motion } from "motion/react";
import {
  Sun, Cloud, CloudRain, CloudLightning, Snowflake,
  CloudSun, CloudFog, CalendarDays, Moon, CloudMoon
} from "lucide-react";

const getSmallIcon = (code, isDay) => {
  if (isDay === 0) {
    if (code === 0) return <Moon size={24} className="text-blue-300" />;
    if (code >= 1 && code <= 3) return <CloudMoon size={24} className="text-gray-400" />;
  }
  if (code === 0) return <Sun size={24} className="text-yellow-500" />;
  if (code >= 1 && code <= 3) return <CloudSun size={24} className="text-orange-400" />;
  if (code === 45 || code === 48) return <CloudFog size={24} className="text-gray-400" />;
  if (code >= 51 && code <= 67) return <CloudRain size={24} className="text-blue-400" />;
  if (code >= 71 && code <= 77) return <Snowflake size={24} className="text-cyan-400" />;
  if (code >= 80 && code <= 82) return <CloudRain size={24} className="text-blue-500" />;
  if (code >= 85 && code <= 86) return <Snowflake size={24} className="text-cyan-500" />;
  if (code >= 95) return <CloudLightning size={24} className="text-purple-500" />;

  return <Cloud size={24} className="text-gray-400" />;
};


const formatTime = (dateObj) => {
  return dateObj.toLocaleString('en-US', { hour: 'numeric', hour12: true });
};

const formatDate = (dateObj) => {
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function HourlyStrip({ data }) {
  const hourly = data?.hourly;

  if (!hourly || !hourly.time) return null;

  const now = new Date();
  const currentHourIndex = hourly.time.findIndex((t) => {
    const timeDate = new Date(t);
    return timeDate.getTime() >= now.setMinutes(0, 0, 0);
  });

  const startIndex = currentHourIndex !== -1 ? currentHourIndex : 0;

  const items = hourly.time.slice(startIndex, startIndex + 25).map((t, i) => {
    const originalIndex = startIndex + i;
    const dateObj = new Date(t);

    return {
      dateObj: dateObj,
      day: dateObj.getDate(),
      temp: Math.round(hourly.temperature_2m[originalIndex]),
      code: hourly.weather_code ? hourly.weather_code[originalIndex] : 0,
      isDay: hourly.is_day ? hourly.is_day[originalIndex] : 1
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-auto pb-4 scrollbar-hide"
    >
      <div className="flex items-center gap-3 w-max px-1">

        {items.map((x, i) => {
          const isNewDay = i > 0 && x.day !== items[i - 1].day;

          return (
            <React.Fragment key={i}>

              {isNewDay && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center px-2 mx-1 border-l border-white/30 pl-4 h-20"
                >
                  <CalendarDays size={16} className="text-blue-500 mb-1" />
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {formatDate(x.dateObj)}
                  </p>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`min-w-[70px] flex flex-col items-center p-3 rounded-xl border border-white/40 shadow-sm transition-colors
                  ${i === 0 ? "bg-blue-50/80 border-blue-200" : "bg-white/40 backdrop-blur-md"}
                `}
              >
                <p className={`text-xs font-rosca ${i === 0 ? "text-blue-600 font-bold" : "text-gray-500"}`}>
                  {i === 0 ? "Now" : formatTime(x.dateObj)}
                </p>

                <div className="my-2">
                  {getSmallIcon(x.code, x.isDay)}
                </div>

                <p className="font-rosca text-gray-700 text-lg">
                  {x.temp}°
                </p>
              </motion.div>

            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
}
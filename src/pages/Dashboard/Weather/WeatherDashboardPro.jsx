import React from "react";
import WeatherCardPro from "./WeatherCardPro";
import HourlyStrip from "./HourlyStrip";
import WeatherExtras from "./WeatherExtras";

export default function WeatherDashboardPro({ data }) {
  return (
    <div className="space-y-6">
      <WeatherCardPro data={data} />
      <HourlyStrip data={data} />
      <WeatherExtras data={data} />
    </div>
  );
}
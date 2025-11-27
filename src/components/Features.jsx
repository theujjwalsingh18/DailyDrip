import React from "react";
import { MapPin, Wand2, FileText, Monitor, Mail, Send, ArrowRight } from "lucide-react";
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
  const cardBaseClasses = "group relative flex flex-col justify-between h-[350px] p-8 rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-900 hover:shadow-xl overflow-hidden";

  return (
    <section className="py-24 px-6 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-rosca mb-6 tracking-tight">
            Your Weather, Your Style
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            Three simple steps to never be caught unprepared by the weather again. 
            Powered by advanced AI to curate your daily look.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={cardBaseClasses}>
            <div>
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-gray-900 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Accurate Forecasts</h3>
              
              <p className="text-gray-500 leading-relaxed text-sm">
                Get a reliable, up-to-the-minute weather forecast for your specific city.
                Choose exactly how you want to receive it: on your personal dashboard,
                in your inbox, or via Telegram.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-6 text-gray-400">
              <Monitor size={20} className="hover:text-gray-900 transition-colors" />
              <Mail size={20} className="hover:text-red-400 transition-colors" />
              <Send size={20} className="hover:text-blue-400 transition-colors" />
            </div>
          </div>
          <div className={cardBaseClasses}>
            <div>
             <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Wand2 size={24} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-semibold mb-4">AI Wardrobe Stylist</h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                This is where the magic happens. Our AI analyzes the day's temperature,
                humidity, and wind to generate a unique, stylish outfit image tailored just for you.
              </p>
            </div>
            <div className="mt-auto pt-8 border-t border-transparent group-hover:border-gray-100 transition-colors duration-300">
              <button className="group/btn inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700">
                See Examples
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
          <div className={cardBaseClasses}>
            <div>
              <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                <FileText size={24} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-semibold mb-4">Contextual Insights</h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                More than just a picture. We give you the "Why". 
                "It's 20°C, but wind chill makes it feel like 16°C. A windbreaker is smart."
              </p>
            </div>
            <div className="mt-8 space-y-3 pt-8 border-t border-gray-100">
              <div className="h-1.5 w-3/4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gray-300 group-hover:bg-gray-900 transition-colors duration-500" />
              </div>
              <div className="h-1.5 w-1/2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-gray-300 group-hover:bg-gray-900 transition-colors duration-500" />
              </div>
            </div>
          </div>

        </div>
        <div className="bg-card mt-4 rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-900 hover:shadow-xl p-8 md:p-12 border-border/50 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-rosca text-foreground mb-3">
              AI-Generated Outfit Examples
            </h3>
            <p className="text-muted-foreground font-rosca italic">
              See how our AI adapts your wardrobe to any weather condition
            </p>
          </div>

          <FeatureCard data={outfitExamples} />
        </div>
      </div>
    </section>
  );
}
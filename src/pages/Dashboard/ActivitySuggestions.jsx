import React from "react";
import { MapPin, Sparkles, Calendar, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";

export default function ActivitySuggestions({ activities }) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
      <div className="flex items-center gap-3 mb-6 px-4 sm:px-0">
        <div className="p-2 rounded-lg bg-blue-100">
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          Today's Activity Suggestions
        </h3>
        <Sparkles className="h-5 w-5 text-blue-500 ml-auto" />
      </div>

      <div className="space-y-8">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="relative group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-none transition-all duration-300 ease-out p-6 sm:p-8 hover:rounded-none hover:border-gray-900"
          >

            <div className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

              <div className="lg:col-span-2 relative rounded-2xl group-hover:rounded-none transition-all duration-300 overflow-hidden aspect-video lg:aspect-4/3 shadow-inner">
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full group-hover:rounded-none transition-all duration-300 shadow-md z-10">
                  {index === 0 ? "Top Pick" : "Alternative"}
                </span>
                <img
                  src={activity.imageUrl}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    const title = encodeURIComponent(activity.title || "Activity");
                    e.target.src = `https://placehold.co/800x600/e2e8f0/475569?text=${title}`;
                  }}
                />
              </div>

              <div className="lg:col-span-3 flex flex-col h-full">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
                  {activity.whatToBring && activity.whatToBring.length > 0 && (
                    <div className="bg-blue-50/50 p-4 rounded-xl group-hover:rounded-none transition-all duration-300 border border-blue-100">
                      <p className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide mb-3">
                        <CheckCircle2 size={14} />
                        What to Bring
                      </p>
                      <ul className="space-y-2">
                        {activity.whatToBring.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activity.dontForget && activity.dontForget.length > 0 && (
                    <div className="bg-orange-50/50 p-4 rounded-xl group-hover:rounded-none transition-all duration-300 border border-orange-100">
                      <p className="flex items-center gap-2 text-xs font-bold text-orange-700 uppercase tracking-wide mb-3">
                        <AlertCircle size={14} />
                        Don't Forget
                      </p>
                      <ul className="space-y-2">
                        {activity.dontForget.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-400 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 px-4 sm:px-0">
        <div className="bg-white p-4 rounded-lg flex items-center gap-3 border border-gray-200 shadow-sm">
          <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0" />
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Activity Tip:</span>
            These suggestions are based on current weather conditions. Always check for weather alerts!
          </p>
        </div>
      </div>
    </div>
  );
}
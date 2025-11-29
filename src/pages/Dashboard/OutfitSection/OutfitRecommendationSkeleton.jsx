import React from "react";
import { Shirt, Sparkles, Lightbulb } from "lucide-react";

export default function OutfitRecommendationSkeleton() {
  const proTip = "Check the weather before heading out!";

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md border border-gray-100 p-6 sm:p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Shirt className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Your Daily Look
          </h2>
        </div>
        <Sparkles className="h-5 w-5 text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-pulse">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-200">
          <div className="absolute top-3 left-3 h-6 w-24 bg-gray-300 rounded-full"></div>
        </div>

        <div className="space-y-6 w-full">
          <div className="h-5 w-3/4 bg-gray-200 rounded"></div>

          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                  <div className="h-4 w-full max-w-sm bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                  <div className="h-4 w-full max-w-xs bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-5">
        <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
          <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Pro tip: </span>
            {proTip}
          </p>
        </div>
      </div>
    </div>
  );
}
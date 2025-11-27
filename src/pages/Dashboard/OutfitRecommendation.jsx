import React from "react";
import { Shirt, Sparkles, Lightbulb } from "lucide-react";

export default function OutfitRecommendation({ outfitData }) {
    if (!outfitData) return null;
    const { outfitImageUrl, suggestions, isFallback } = outfitData;

    const wearItems = suggestions?.outfit || [];
    const accessories = suggestions?.dontForget || [];
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl group">
                    <span
                        className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10 ${isFallback ? "bg-gray-500" : "bg-orange-500"
                            }`}
                    >
                        {isFallback ? "Curated Look" : "AI Suggested"}
                    </span>

                    <img
                        src={outfitImageUrl}
                        alt="Outfit flat lay"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 shadow-sm border border-gray-100"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/800x1067/eee/ccc?text=Outfit+Image';
                        }}
                    />
                </div>

                <div className="space-y-6">
                    <p className="text-gray-600 text-base font-medium">
                        Curated specifically for today's weather.
                    </p>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                            What to Wear:
                        </h3>
                        <ul className="space-y-2">
                            {wearItems.length > 0 ? wearItems.map((item, index) => (
                                <li key={index} className="flex items-center gap-3 group">
                                    <div
                                        className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform shrink-0"
                                        style={{ background: 'hsl(188 94% 43%)' }}
                                    />
                                    <span className="text-sm text-black leading-relaxed">{item}</span>
                                </li>
                            )) : (
                                <p className="text-sm text-gray-400 italic">No specific items listed.</p>
                            )}
                        </ul>
                    </div>

                    {accessories.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                                Don't Forget:
                            </h3>
                            <ul className="space-y-2">
                                {accessories.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 group">
                                        <div
                                            className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform shrink-0"
                                            style={{ background: 'hsl(24 95% 53%)' }}
                                        />
                                        <span className="text-sm text-black leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

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
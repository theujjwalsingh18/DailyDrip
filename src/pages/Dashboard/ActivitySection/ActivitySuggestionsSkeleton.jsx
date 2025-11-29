import React from "react";
import { Calendar, Sparkles, Lightbulb } from "lucide-react";

export default function ActivitySuggestionsSkeleton() {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6 px-4 sm:px-0">
                <div className="p-2 rounded-lg bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Today's Activity Suggestions
                </h3>
                <Sparkles className="h-5 w-5 text-blue-500 ml-auto" />
            </div>
            <div className="space-y-8 animate-pulse">
                {[1, 2].map((index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-video lg:aspect-4/3 bg-gray-200">
                                <div className="absolute top-3 left-3 h-6 w-24 bg-gray-300 rounded-full"></div>
                            </div>

                            <div className="lg:col-span-3 flex flex-col h-full w-full">
                                <div className="mb-6 space-y-3">
                                    <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 h-32">
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 w-full bg-gray-200 rounded"></div>
                                            <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                                            <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 h-32">
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 w-full bg-gray-200 rounded"></div>
                                            <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
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
                        <span className="font-semibold text-gray-700">Activity Tip: </span>
                        These suggestions are based on current weather conditions. Always check for weather alerts!
                    </p>
                </div>
            </div>
        </div>
    );
}
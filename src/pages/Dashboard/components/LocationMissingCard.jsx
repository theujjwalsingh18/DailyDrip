import React from "react";
import { MapPinOff } from "lucide-react";

export default function LocationMissingCard() {
  return (
    <div className="w-full bg-white rounded-3xl shadow-sm border border-orange-100 p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
      <div className="bg-orange-50 p-4 rounded-full">
        <MapPinOff className="h-8 w-8 text-orange-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">
        Location Required
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        We can't generate your Outfit or Activity suggestions without knowing where you are.
      </p>
      <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium mt-2">
        Please set your location in the Profile Settings panel.
      </div>
    </div>
  );
}
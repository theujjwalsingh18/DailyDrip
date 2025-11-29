import React from "react";

export default function AuthCard({ children, title, subtitle, oauth }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full transform transition-all duration-500
                    p-6 sm:p-12">

      <div className="text-center mb-8 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">{title}</h1>
        <p className="text-gray-500 text-sm sm:text-base font-medium">{subtitle}</p>
      </div>
      <div className="mb-8 flex justify-center w-full">
        {oauth}
      </div>

      <div className="relative flex py-2 items-center mb-8">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-widest font-semibold">Or continue with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {children}
    </div>
  );
}
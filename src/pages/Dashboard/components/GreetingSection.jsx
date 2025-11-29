import React from 'react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "Good night"; 
  if (hour < 12) return "Good morning"; 
  if (hour < 18) return "Good afternoon"; 
  if (hour < 21) return "Good evening"; 
  return "Good night"; 
};

const GreetingSection = ({ userName = "Jhon" }) => {
  const greeting = getGreeting();

  return (
    <div className="bg-white/30 backdrop-blur-xl p-7 rounded-3xl shadow-xl border border-white/40">
      <div
        className="
          flex flex-col md:flex-row 
          items-center md:items-start 
          justify-between 
          gap-6 md:gap-4
        "
      >

        <div className="space-y-2 text-center md:text-left max-w-full md:max-w-[60%] min-w-0">
          <h1
            className="
              text-2xl sm:text-3xl lg:text-4xl 
              font-rosca 
              text-cyan-600
            "
          >
            {greeting}, {userName}!
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Here&apos;s your daily weather update and personalized outfit recommendations.
          </p>
        </div>

        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <img
            src="https://www.animatedimages.org/data/media/1250/animated-hello-kitty-image-0066.gif"
            alt="Hello Kitty"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-36 md:h-36 object-contain shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default GreetingSection;

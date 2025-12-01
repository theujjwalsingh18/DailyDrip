import React from "react";
import Hero from "../../components/Hero";
import HowItWorks from "../../components/Workflow";
import FeatureShowcase from "../../components/Features";
import { BackgroundBeamsWithCollision } from "../../components/ui/BackgroundBeamsWithCollision";
import { RainbowButton } from "../../components/ui/RaibowButton";
import Text from "../../components/ui/Text";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Hero />

      <div id="features">
        <FeatureShowcase />
      </div>

      <div className="bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] min-h-screen text-white">
        <div id="workflow">
          <HowItWorks />
        </div>

        <BackgroundBeamsWithCollision>
          <h2 className="text-2xl relative z-20  md:text-4xl lg:text-7xl font-bold text-center text-white font-sans tracking-tight">
            Ready to Wake Up Smarter ? <br />
            <div className="relative mx-auto inline-block w-max">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500">
                <span>Join DailyDrip </span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span>Join DailyDrip</span>
              </div>
            </div>
            <br />
            <br />
            <RainbowButton
              onClick={() => navigate("/signup")}
            >Get Access</RainbowButton>
            <br />
            <Text />
          </h2>
        </BackgroundBeamsWithCollision>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { MorphingText } from '@/components/ui/MorphingText';
import { config } from '@/config/env';
const Hero = () => {
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const DEMO_URL = config.DEMO_URL;
    const handleConnectTelegram = () => {
        window.open('"https://t.me/uji_dailydrip_bot"', '_blank'); 
    };

    const handleCloseModal = (e) => {
        if (e.target.id === "modal-overlay") {
            setIsDemoOpen(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#A0D4FF] font-sans selection:bg-blue-200">
            {isDemoOpen && (
                <div 
                    id="modal-overlay"
                    onClick={handleCloseModal}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                >
                    <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setIsDemoOpen(false)}
                            className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition hover:bg-white/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="aspect-video w-full">
                            <iframe 
                                className="h-full w-full"
                                src={DEMO_URL}
                                title="Daily Fit Demo"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-[#89C4FF] via-[#BEE3FF] to-[#E5F4FF]"></div>
            <div className="absolute top-16 left-10 md:left-32 md:mt-5 animate-pulse-slow">
                <div className="h-28 w-28 rounded-full bg-gradient-to-br from-[#FFEB3B] to-[#FDB813] shadow-[0_0_60px_20px_rgba(253,184,19,0.4)]"></div>
                <div className="absolute -inset-4 rounded-full border-[1px] border-white/20 blur-sm"></div>
            </div>
            <div className="absolute top-24 -right-20 w-[600px] text-white/20 opacity-60 pointer-events-none">
                <svg viewBox="0 0 500 200" fill="currentColor">
                    <path d="M100 150 C 80 150, 60 140, 50 120 C 30 130, 0 120, 0 90 C 0 50, 40 30, 70 40 C 90 10, 150 0, 190 30 C 220 10, 280 20, 300 60 C 330 60, 350 80, 350 100 C 350 130, 320 150, 290 150 Z" />
                </svg>
            </div>
            <div className="absolute top-1/3 -left-20 w-[400px] text-white/30 opacity-50 blur-[1px] pointer-events-none">
                <svg viewBox="0 0 500 200" fill="currentColor">
                    <path d="M50 100 C 50 70, 90 50, 130 60 C 150 30, 220 20, 260 60 C 290 50, 330 70, 330 100 C 330 130, 290 140, 260 140 L 80 140 C 50 140, 50 110, 50 100 Z" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full text-[#CDE8FF] opacity-80 z-0">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[400px] md:h-[500px] fill-current">
                    <path d="M0,160 C150,180 250,100 400,120 C550,140 600,220 750,200 C900,180 950,100 1100,120 C1250,140 1350,200 1440,180 V320 H0 Z" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full text-white/40 blur-[2px] z-0">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[250px] md:h-[350px] fill-current">
                    <path d="M0,192 C120,220 240,150 360,160 C480,170 600,240 720,230 C840,220 960,160 1080,170 C1200,180 1320,240 1440,220 V320 H0 Z" />
                </svg>
            </div>
            <div className="absolute -bottom-10 left-0 w-full text-white opacity-90 z-0">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[200px] fill-current">
                    <path d="M0,128 C80,160 160,120 240,130 C320,140 400,200 480,190 C560,180 640,120 720,130 C800,140 880,200 960,190 C1040,180 1120,120 1200,130 C1280,140 1360,180 1440,160 V320 H0 Z" />
                </svg>
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl mt-[10vh] flex-col px-4 pt-6 sm:px-6 lg:px-8">

                <div className="mt-15 flex flex-col items-center text-center lg:mt-12">
                    <h1 className="flex flex-col items-center font-extrabold tracking-tight text-[#0F172A] leading-none">
                        <p className="text-4xl xs:text-5xl sm:text-9xl lg:text-8xl mt-3 text-neutral-800 font-rosca pb-2 whitespace-nowrap md:text-7xl">
                            Your Daily Dose of
                        </p>
                        <MorphingText
                            texts={["Weather", "Style"]}
                            className="text-4xl mt-2 sm:text-5xl lg:text-8xl md:text-7xl font-medium leading-tight"
                        />
                    </h1>
                    <p className="max-w-md mt-7 text-white text-sm sm:text-base mx-auto md:mx-0 font-medium">
                        Smart outfit suggestions based on today's weather — delivered right
                        to your inbox or Telegram.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-5">
                        <GlassButton 
                            text="Connect Telegram" 
                            onClick={handleConnectTelegram}
                        />
                        <GlassButton 
                            text="See Demo" 
                            onClick={() => setIsDemoOpen(true)}
                        />
                    </div>
                </div>

                <div className="relative mt-20 flex w-full grow justify-center pb-20 bottom-0">
                    <div className="relative z-20 max-w-5xl w-full">
                        <img
                            src="https://res.cloudinary.com/dfcr2wmux/image/upload/v1764143519/hero_jvg8dv.png" 
                            alt="Daily Fit Dashboard and Mobile App"
                            className="w-full h-auto object-contain drop-shadow-2xl animate-fade-in-up"
                        />
                    </div>

                    <div className="absolute top-[10%] left-[5%] animate-bounce delay-1000 hidden lg:block z-30">
                        <FloatingGlassCard icon="☀️" color="bg-orange-50" />
                    </div>
                    <div className="absolute bottom-[20%] left-[10%] animate-bounce delay-700 hidden lg:block z-30">
                        <FloatingGlassCard icon="☁️" color="bg-blue-50" />
                    </div>
                    <div className="absolute top-[15%] right-[5%] animate-bounce delay-100 hidden lg:block z-30">
                        <FloatingGlassCard icon="🌤️" color="bg-yellow-50" />
                    </div>
                    <div className="absolute bottom-[10%] right-[15%] animate-bounce delay-500 hidden lg:block z-30">
                        <FloatingGlassCard icon="🌧️" color="bg-slate-50" />
                    </div>

                </div>

            </div>
        </div>
    );
};


const GlassButton = ({ text, onClick }) => (
    <button 
        onClick={onClick}
        className="group relative overflow-hidden rounded-full border border-white/40 bg-white/30 px-8 py-3.5 text-[17px] font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/50 hover:scale-105 hover:shadow-lg active:scale-95"
    >
        <span className="relative z-10">{text}</span>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    </button>
);

const FloatingGlassCard = ({ icon, color = "bg-white/40" }) => (
    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 ${color} shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-md hover:scale-110 transition-transform`}>
        <span className="text-3xl filter drop-shadow-sm">{icon}</span>
    </div>
);

export default Hero;
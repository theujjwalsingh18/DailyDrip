import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MorphingText } from '@/components/ui/MorphingText';
import { config } from '@/config/env';

const Hero = () => {
    const [isDemoOpen, setIsDemoOpen] = useState(false);
    const DEMO_URL = config.DEMO_URL;

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

    const handleConnectTelegram = () => {
        window.open('https://t.me/uji_dailydrip_bot', '_blank'); 
    };

    const handleCloseModal = (e) => {
        if (e.target.id === "modal-overlay") {
            setIsDemoOpen(false);
        }
    };

    return (
        <div ref={ref} className="relative min-h-screen w-full overflow-hidden bg-[#A0D4FF] font-sans selection:bg-blue-200">
            {isDemoOpen && (
                <div 
                    id="modal-overlay"
                    onClick={handleCloseModal}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 md:p-10 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                >
                    <div className="relative w-full max-w-6xl h-fit overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl animate-in zoom-in-95 duration-200">
                        <button 
                            onClick={() => setIsDemoOpen(false)}
                            className="absolute top-4 right-4 z-[110] rounded-full bg-black/40 p-2 text-white backdrop-blur-md transition hover:bg-white/20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <div className="relative w-full h-[60vh] md:h-[80vh] bg-black">
                            <iframe 
                                className="absolute inset-0 h-full w-full border-0" 
                                src={DEMO_URL}
                                title="Daily Fit Demo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
            <div className="absolute bottom-0 left-0 w-full text-[#CDE8FF] opacity-80 z-0">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[400px] md:h-[500px] fill-current">
                    <path d="M0,160 C150,180 250,100 400,120 C550,140 600,220 750,200 C900,180 950,100 1100,120 C1250,140 1350,200 1440,180 V320 H0 Z" />
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
                    <motion.div 
                        style={{ y: parallaxY }}
                        className="relative z-20 max-w-5xl w-full"
                    >
                        <img
                            src="https://res.cloudinary.com/dfcr2wmux/image/upload/v1764576465/vk_18_erehrb.png" 
                            alt="Daily Fit Dashboard"
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </motion.div>

                    <div className="absolute top-[10%] left-[5%] animate-bounce delay-1000 hidden lg:block z-30">
                        <FloatingGlassCard icon="☀️" color="bg-orange-50" />
                    </div>
                    <div className="absolute top-[15%] right-[5%] animate-bounce delay-100 hidden lg:block z-30">
                        <FloatingGlassCard icon="🌤️" color="bg-yellow-50" />
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
    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/60 ${color} shadow-lg backdrop-blur-md hover:scale-110 transition-transform`}>
        <span className="text-3xl">{icon}</span>
    </div>
);

export default Hero;
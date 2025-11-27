import { useState, useEffect } from "react";
import { Flame } from "lucide-react";

export const StreakCounter = ({
    count,
    label = "Day Streak",
    showMilestone = true,
}) => {
    const [displayCount, setDisplayCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [burst, setBurst] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (displayCount !== count) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setDisplayCount(count);
                setIsAnimating(false);
            }, 120);
            return () => clearTimeout(timer);
        }
    }, [count, displayCount]);

    useEffect(() => {
        const next = (count % 7) * (360 / 7);
        const timer = setTimeout(() => setProgress(next), 10);
        return () => clearTimeout(timer);
    }, [count]);

    const isMilestone = showMilestone && count > 0 && count % 7 === 0;

    useEffect(() => {
        if (isMilestone) {
            setBurst(true);
            const timer = setTimeout(() => setBurst(false), 600);
            return () => clearTimeout(timer);
        }
    }, [isMilestone]);

    const flameStyles = {
        width: "2rem",
        height: "2rem",
        transition: "all 300ms",
        color: count > 0 ? "hsl(0 91% 58%)" : "hsl(215.4 16.3% 46.9%)",
        filter: isMilestone ? "drop-shadow(0 0 12px hsl(45 100% 51%))" : "none",
    };

    return (
        <div className="relative mt-1vh">
            <div
                className="absolute inset-0  blur-3xl opacity-10 animate-heat-waves "
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(255,120,40,0.3), transparent 70%)",
                }}
            />

            <div className="relative mt-1 p-4 overflow-hidden">
                {isMilestone && (
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, hsl(45 100% 51% / 0.35), transparent)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2s linear infinite",
                        }}
                    />
                )}

                <div className="flex items-center justify-between gap-6">
                    <div className="relative">
                        {burst && (
                            <div className="absolute inset-0 animate-fire-burst pointer-events-none">
                                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,180,0,0.4),transparent)] scale-150 blur-2xl" />
                            </div>
                        )}
                        <svg
                            className="absolute inset-0 w-24 h-24 -rotate-90"
                            viewBox="0 0 100 100"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="hsl(210 40% 96.1%)"
                                strokeWidth="4"
                                opacity="0.2"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="url(#fireGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={`${progress} 283`}
                                className="transition-[stroke-dasharray] duration-700 ease-out"
                            />
                            <defs>
                                <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="hsl(45 100% 51%)" />
                                    <stop offset="50%" stopColor="hsl(25 95% 53%)" />
                                    <stop offset="100%" stopColor="hsl(0 91% 58%)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className={`${count > 0 ? "animate-flame-flicker" : ""}`}>
                                <Flame style={flameStyles} />
                                {count > 0 && (
                                    <div
                                        className="absolute inset-0 rounded-full blur-xl opacity-30"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, hsl(45 100% 51%), hsl(25 95% 53%), hsl(0 91% 58%))",
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        {isMilestone && (
                            <div
                                className="absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full animate-number-pop"
                                style={{
                                    background:
                                        "linear-gradient(135deg, hsl(25 95% 53%), hsl(0 91% 58%))",
                                    color: "white",
                                    boxShadow: "0 8px 24px -4px hsl(25 95% 53% / 0.4)",
                                }}
                            >
                                🎉 {count}!
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-right">
                        <div className="text-sm font-rosca mb-1" style={{ color: "hsl(215.4 16.3% 46.9%)" }}>
                            {label}
                        </div>

                        <div
                            className={`
                                text-2xl font-rosca
                                ${isAnimating ? "animate-number-pop" : ""}
                            `}
                            style={{
                                background:
                                    "linear-gradient(135deg, hsl(45 100% 51%), hsl(25 95% 53%), hsl(0 91% 58%))",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            {displayCount}
                        </div>

                        {count >= 7 && (
                            <div
                                className="text-xs mt-2 flex items-center justify-end gap-1"
                                style={{ color: "hsl(215.4 16.3% 46.9%)" }}
                            >
                                <span
                                    className="inline-block w-2 h-2 rounded-full animate-pulse"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, hsl(25 95% 53%), hsl(0 91% 58%))",
                                    }}
                                />
                                Week {Math.floor(count / 7)} achieved!
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="mt-4 h-1 rounded-full overflow-hidden"
                    style={{ background: "hsl(210 40% 96.1%)" }}
                >
                    <div
                        className="h-full transition-all duration-500 ease-out"
                        style={{
                            width: `${((count % 7) / 7) * 100}%`,
                            background:
                                "linear-gradient(135deg, hsl(25 95% 53%), hsl(0 91% 58%))",
                        }}
                    />
                </div>

                {count > 0 && count % 7 !== 0 && (
                    <div className="text-xs text-center mt-2" style={{ color: "hsl(215.4 16.3% 46.9%)" }}>
                        {7 - (count % 7)} days to next milestone
                    </div>
                )}
            </div>
        </div>
    );
};

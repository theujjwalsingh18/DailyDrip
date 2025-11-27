import { useState, useEffect } from "react";
import api from "../../api/index";

export default function GenderModal({ user, setUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            if (!user.gender || user.gender === "unisex") {
                setIsOpen(true);
            }
        }
    }, [user]);

    const handleSelection = async (selectedGender) => {
        setLoading(true);
        try {
            const res = await api.put("/user/update", {
                gender: selectedGender
            });
            setUser({ ...user, gender: selectedGender });
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to update gender:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">

                <div className="bg-blue-600 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white">Welcome to DailyDrip! 💧</h2>
                    <p className="text-blue-100 mt-2 text-sm">
                        To curate the best outfits for you, we need to know your style preference.
                    </p>
                </div>
                <div className="p-8">
                    <p className="text-gray-600 text-center mb-6 font-medium">
                        Which collection would you like to see?
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleSelection("male")}
                            disabled={loading}
                            className="flex flex-col items-center justify-center p-4 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        >
                            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🧔🏻‍♂️</span>
                            <span className="font-semibold text-gray-700 group-hover:text-blue-600">Menswear</span>
                        </button>

                        <button
                            onClick={() => handleSelection("female")}
                            disabled={loading}
                            className="flex flex-col items-center justify-center p-4 border-2 border-gray-100 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all group"
                        >
                            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">👩🏻</span>
                            <span className="font-semibold text-gray-700 group-hover:text-pink-600">Womenswear</span>
                        </button>
                    </div>

                    {loading && (
                        <p className="text-center text-gray-400 text-sm mt-4 animate-pulse">
                            Updating your profile...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
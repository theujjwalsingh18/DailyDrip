import React from "react";
import { motion, AnimatePresence } from "motion/react";
import useAuth  from "@/context/AuthContext";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useToast from "@/hooks/useToast";
import api from "@/api";

export default function ProfileDropdown({ open }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { errorToast, warningToast } = useToast();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleDeleteAccount = () => {
        if (
            window.confirm(
                "Are you sure you want to delete your account? This is irreversible."
            )
        ) {
            api.delete("/user/delete")
                .then(() => {
                    warningToast("Account deleted successfully.");
                    logout();
                })
                .catch((err) => {
                    errorToast("Failed to delete account. Please try again.");
                });
            console.log("Account deletion requested.");
        }
    };

    const variants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { opacity: 1, scale: 1, y: 0 },
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-100"
                >
                    <div className="py-2">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
                        >
                            <FiLogOut />
                            <span>Logout</span>
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <FiTrash2 />
                            <span>Delete Account</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
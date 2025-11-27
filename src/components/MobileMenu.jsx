import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiTrash2, FiX } from "react-icons/fi";
import  useAuth  from "@/context/AuthContext";
import useToast from "@/hooks/useToast";
import api from "@/api";
import ProfileCard from "@/pages/Dashboard/ProfileCard";
import NotificationSettings from "@/pages/Dashboard/NotificationSettings";

export default function MobileMenu({ open, onClose, navLinks, onNavigate, user }) {
  const { fetchMe, logout } = useAuth();
  const { successToast, errorToast,  warningToast} = useToast();
  const navigate = useNavigate();
  const handleSaveProfile = async (updatedData) => {
    try {
      await api.put("/user/update", updatedData);
      successToast("Profile saved successfully");
      await fetchMe();
    } catch (err) {
      errorToast(err?.message || "Error: Could not save profile.");
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  const handleDeleteAccount = () => {
    onClose();
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

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-500"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-501"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FiX size={28} />
            </button>
            
            <div className="h-full w-full overflow-y-auto p-6 pt-16 space-y-8">
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Profile</h3>
                <ProfileCard user={user} onSave={handleSaveProfile} />
                <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
                <NotificationSettings />
              </div>
              <hr />
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Navigation</h3>
                {navLinks.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => onNavigate(item)}
                    className="text-left text-lg font-medium text-gray-700 hover:text-black p-2 rounded-md hover:bg-gray-100"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <hr />

              <div className="flex flex-col space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Account</h3>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-lg font-medium text-gray-700 hover:text-black p-2 rounded-md hover:bg-gray-100"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-3 text-lg font-medium text-red-600 hover:text-red-700 p-2 rounded-md hover:bg-red-50"
                >
                  <FiTrash2 />
                  <span>Delete Account</span>
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
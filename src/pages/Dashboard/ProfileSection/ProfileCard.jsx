import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, LocateFixed, Camera, User } from "lucide-react";
import { AnimatedText } from "../../../components/ui/AnimateText";
import { StreakCounter } from "@/components/ui/StreakCounter";
import api from "@/api";
import useToast from "@/hooks/useToast";
import { config } from "@/config/env";

const CLOUDINARY_UPLOAD_PRESET = config.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = config.CLOUDINARY_UPLOAD_URL;


const formatLocationString = (loc) => {
  if (!loc) return "User location";
  const parts = [loc.city, loc.state, loc.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "User location";
};

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: "POST", body: formData });
  const data = await res.json();

  if (data.secure_url) return data.secure_url;
  throw new Error("Cloudinary upload failed");
};

export default function ProfileCard({ user, onSave }) {
  const { successToast, warningToast, errorToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [location, setLocation] = useState(user?.location || {});
  const [lat, setLat] = useState(user?.location?.lat || null);
  const [lon, setLon] = useState(user?.location?.lon || null);

  const [fullName, setFullName] = useState(user?.fullName || "User Name");
  const [profilePic, setProfilePic] = useState(user?.picture || null);
  const [streak, setStreak] = useState(user?.streak || 0);
  const [gender, setGender] = useState(user?.gender || "unisex");

  useEffect(() => {
    if (isEditing) return;
    if (!user) return;

    setFullName(user.fullName || "User Name");
    setProfilePic(user.picture || null);
    setStreak(user.streak || 0);
    setLocation(user.location || {});
    setLat(user.location?.lat ?? null);
    setLon(user.location?.lon ?? null);
    setGender(user.gender || "unisex");
  }, [user, isEditing]);

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  const handleFetchLocation = () => {
    setIsFetchingLocation(true);

    if (!navigator.geolocation) {
      warningToast("Geolocation not supported");
      setIsFetchingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const newLat = pos.coords.latitude;
          const newLon = pos.coords.longitude;
          setLat(newLat);
          setLon(newLon);

          const res = await api.get(`/reverse?lat=${newLat}&lon=${newLon}`);
          const data = res.data;
          const cleanLocation = {
            city: data.details?.city || "",
            state: data.details?.state || "",
            country: data.details?.country || "",
            lat: newLat,
            lon: newLon,
          };

          setLocation(cleanLocation);

        } catch (err) {
          console.error("Location Error:", err);
          errorToast("Could not fetch address details.");
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        console.error("Geo Error:", error);
        errorToast("Location permission denied.");
        setIsFetchingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      warningToast("File too large. Max 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => setProfilePic(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);

    let pictureUrl = profilePic;
    if (profilePic && profilePic.startsWith("data:image/")) {
      try {
        pictureUrl = await uploadImageToCloudinary(profilePic);
      } catch (err) {
        errorToast("Error uploading image");
        setIsSaving(false);
        return;
      }
    }

    try {
      await onSave({
        fullName,
        picture: pictureUrl,
        gender,
        streak,
        location: location,
        lat,
        lon
      });

      setTimeout(() => setIsEditing(false), 400);
    } catch (err) {
      errorToast("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;
    setFullName(user.fullName);
    setProfilePic(user.picture);
    setStreak(user.streak);
    setLocation(user.location || {});
    setLat(user.location?.lat ?? null);
    setLon(user.location?.lon ?? null);
    setGender(user.gender);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto [perspective:1200px]">
      <motion.div
        className="relative w-full h-[650px]"
        animate={isEditing ? "back" : "front"}
        variants={flipVariants}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 w-full h-full rounded-3xl shadow-md border border-gray-100 p-6 flex flex-col items-center [backface-visibility:hidden]">
          <div className="mt-4 w-40 h-40 rounded-full p-1 bg-white shadow-lg mb-4 relative">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
              {profilePic ? <img src={profilePic} className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-gray-300" />}
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white text-[10px] font-light px-2 py-1 rounded-full border-2 border-white capitalize">
              {gender}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            <AnimatedText text={fullName} textClassName="text-[1.5rem]" />
          </h2>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <MapPin className="text-red-500 h-4 w-4" />
            <span className="truncate max-w-[200px]">
              {formatLocationString(location)}
            </span>
          </div>

          <div className="mt-6">
            <StreakCounter count={streak} label="Daily Streak" />
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-auto w-full font-rosca max-w-xs px-6 py-3.5 rounded-full bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all"
          >
            Edit Profile
          </button>
        </div>
        <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] rounded-3xl bg-white shadow-2xl border border-gray-100 p-6 flex flex-col items-center [backface-visibility:hidden] overflow-y-auto scrollbar-hide">
          <h3 className="text-2xl font-rosca italic text-gray-800 mb-6">Edit Profile</h3>
          <div className="relative w-32 h-32 rounded-full bg-gray-100 shadow-inner overflow-hidden border-4 border-white mb-6 group">
            {profilePic ? (
              <img src={profilePic} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
              <Camera className="text-white w-8 h-8" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          <div className="w-full max-w-xs space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Gender</label>
              <div className="flex gap-2 p-1 bg-gray-50 border border-gray-200 rounded-xl">
                {["male", "female", "unisex"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium ${gender === g ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                      }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Location</label>
              <div className="flex items-center gap-2">
                <input
                  value={formatLocationString(location)}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
                />
                <button
                  onClick={handleFetchLocation}
                  disabled={isFetchingLocation}
                  className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 disabled:opacity-50"
                >
                  {isFetchingLocation ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LocateFixed size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-xs font-rosca gap-3 mt-auto pt-6">
            <button onClick={handleCancel} className="flex-1 py-3 rounded-full bg-gray-100 text-gray-600">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || isFetchingLocation}
              className="flex-1 py-3 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
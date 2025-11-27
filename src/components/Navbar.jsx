import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import useClickOutside from "../hooks/useClickOutSide";
import { FlipWords } from "./ui/FlipWord";

export default function Navbar({
  mode = "landing",
  navLinks = [],
  showProfile = false,
  user = null,
}) {
  const [hidden, setHidden] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setShowProfileDropdown(false));

  const { scrollY, scrollYProgress } = useScroll();
  const navigate = useNavigate();

  const defaultProfilePicture = "https://www.citypng.com/public/uploads/preview/charming-hello-kitty-holding-camera-transparent-background-735811696675031oxaonw1zd8.png";

  const navHeight = useTransform(scrollY, [0, 200], [80, 60]);
  const scaleValue = useTransform(scrollY, [0, 200], [1, 0.98]);
  const widthValue = useTransform(scrollY, [0, 200], ["95%", "92%"]);
  const paddingValue = useTransform(scrollY, [0, 200], ["1rem 1.5rem", "0.5rem 1rem"]);
  const blurValue = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(12px)"]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });


  useEffect(() => {
    let lastY = window.scrollY;
    const update = () => {
      const current = window.scrollY;
      if (current > lastY + 15 && current > 200) setHidden(true);
      else if (current < lastY - 15) setHidden(false);
      lastY = current;
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleMobileNavigate = (item) => {
    if (mode === "landing") {
      const el = document.getElementById(item.sectionId);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    } else {
      navigate(item.to);
    }
    setShowMobileMenu(false);
  };

  return (
    <>
      <motion.nav
        style={{
          height: navHeight,
          width: widthValue,
          scale: scaleValue,
          padding: paddingValue,
          backdropFilter: blurValue,
        }}
        animate={{
          y: hidden ? -100 : 0,
          transition: { type: "spring", stiffness: 100, damping: 18 },
        }}
        className="fixed top-4 left-0 right-0 mx-auto z-50 
                   rounded-full shadow-[0_0_25px_rgba(0,0,0,0.08)] 
                   bg-white/90 border border-white/70 
                   flex items-center justify-between max-w-7xl"
      >
        <div
          className="flex items-center h-full gap-2 cursor-pointer shrink-0 z-20"
          onClick={() => navigate("/")}
        >
          <img
            src="https://res.cloudinary.com/dfcr2wmux/image/upload/v1762947846/logo-dailyDrip_wb8ysk.png"
            alt="DailyDrip Logo"
            className="h-full object-contain rounded-lg"
          />
          <span className="font-rosca italic text-blue-500 text-xl flex items-center">
            Daily{' '}
            <span className="w-[60px] inline-block ml-1">
              <FlipWords
                duration={2500}
                className="text-blue-400 m-0! p-0!"
              />
            </span>
          </span>
        </div>

        <div className="hidden md:flex flex-1 justify-center items-center gap-8 text-gray-700 font-rosca">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (mode === "landing") {
                  const el = document.getElementById(item.sectionId);
                  if (el) {
                    const offset =
                      el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: offset, behavior: "smooth" });
                  }
                } else {
                  navigate(item.to);
                }
              }}
              className="hover:text-black transition-colors whitespace-nowrap text-sm lg:text-base"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 z-20 shrink-0">
          {mode === "landing" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="bg-black text-white rounded-full px-4 py-2 font-mono shadow-sm hover:bg-gray-900 transition"
            >
              Get Started
            </motion.button>
          )}
          {showProfile && (
            <button
              className="lg:hidden block"
              onClick={() => setShowMobileMenu(true)}
            >
              <img
                src={user?.picture || defaultProfilePicture}
                alt="Profile"
                className="w-9 h-9 rounded-full border border-gray-300 object-cover"
              />
            </button>
          )}
          <div ref={dropdownRef} className="relative">
            {showProfile && (
              <button
                className="hidden lg:block"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
              >
                <img
                  src={user?.picture || defaultProfilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300 object-cover hover:ring-2 ring-blue-100 transition-all"
                />
              </button>
            )}
            <ProfileDropdown open={showProfileDropdown} />
          </div>
        </div>
      </motion.nav>
      {mode === "landing" && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-black origin-left z-[9999]"
          style={{ scaleX }}
        />
      )}

      {showProfile && (
        <MobileMenu
          open={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
          navLinks={navLinks}
          onNavigate={handleMobileNavigate}
          user={user}
        />
      )}
    </>
  );
}
import React from "react";
import {Navigate, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import  useAuth  from "@/context/AuthContext";

export default function MainLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative font-inter text-gray-900">
      
      <Navbar
        mode="landing"
        navLinks={[
          { label: "Features", sectionId: "features" },
          { label: "Workflow", sectionId: "workflow" },
          { label: "About", sectionId: "about" }
        ]}
        showProfile={false}
      />
      <Outlet />
      <div id="about">
        <Footer />
      </div>
    </div>
  );
}

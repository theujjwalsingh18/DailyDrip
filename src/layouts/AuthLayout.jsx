import {Navigate, Outlet } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import useAuth from "@/context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
   <AuroraBackground>
      <div className="relative z-10">
        <Outlet />
      </div>
    </AuroraBackground>
  );
}
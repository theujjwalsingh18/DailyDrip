import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import  useAuth  from "@/context/AuthContext";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

export default function DashboardLayout() {
  const { user } = useAuth();
  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '' }}>
      <InteractiveBackground/>
      <Navbar
        mode="dashboard"
        navLinks={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "History", to: "/history" }
        ]}
        showProfile={true}
        user={user}
      />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}



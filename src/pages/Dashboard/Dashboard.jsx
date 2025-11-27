import React, { useState, useEffect, useRef } from "react";
import GreetingSection from "./GreetingSection";
import WeatherDashboardPro from "./Weather/WeatherDashboardPro";
import ProfileCard from "./ProfileCard";
import NotificationSettings from "./NotificationSettings";
import OutfitRecommendation from "./OutfitRecommendation";
import ActivitySuggestions from "./ActivitySuggestions";
import ScrollSection from "@/components/ScrollSection";
import useAuth from "@/context/AuthContext";
import api from "../../api";
import GenderModal from "./GenderModal";
import DripLoader from "@/components/ui/DripLoader";
import useToast from "../../hooks/useToast";

export default function Dashboard() {
  const { user, fetchMe } = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [isLoadingAI, setIsLoadingAI] = useState(true);

  const { successToast, warningToast, errorToast } = useToast();

  const hasFetched = useRef(false);

  const [reminderCount, setReminderCount] = useState(0);
  const [userDismissed, setUserDismissed] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (hasFetched.current) return;

    const initDashboard = async () => {
      hasFetched.current = true;

      try {
        let lat = user.location?.lat;
        let lon = user.location?.lon;
        if (!lat || !lon) {
          try {
            const pos = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
              });
            });

            lat = pos.coords.latitude;
            lon = pos.coords.longitude;

            await api.put("/user/update", { newCoords: { lat, lon } });
            fetchMe();
          } catch (e) {
            lat = 28.6139;
            lon = 77.2090;
          }
        }

        const weatherRes = await api.get(`/combined?lat=${lat}&lon=${lon}`);

        setWeatherData({
          location: weatherRes.data.location,
          current: weatherRes.data.weather.current,
          daily: weatherRes.data.weather.daily,
          hourly: weatherRes.data.weather.hourly,
        });

        api
          .get("/dashboard/today")
          .then((aiRes) => {
            setAiData({
              outfit: aiRes.data.outfit,
              activity: aiRes.data.activity,
            });
            setIsLoadingAI(false);
          })
          .catch(() => {
            setIsLoadingAI(false);
          });
      } catch {
        hasFetched.current = false;
      }
    };

    initDashboard();
  }, [user]);


  useEffect(() => {
    if (!user) return;

    const hasLocation = user.location?.lat && user.location?.lon;

    if (hasLocation) return;
    if (userDismissed) return;
    if (reminderCount >= 6) return;
    const timer = setTimeout(() => {
      warningToast("We need your location to personalize outfit and activity suggestions! Update via Profile → Location");
    });
    return () => clearTimeout(timer);
  }, [user, reminderCount, userDismissed]);


  const handleSaveProfile = async (updatedData) => {
    try {
      await api.put("/user/update", updatedData);
      successToast("Profile saved successfully");
      await fetchMe();
    } catch {
      errorToast("Error saving profile.");
    }
  };

  const handleGenderUpdate = () => fetchMe();

  if (!weatherData) return <DripLoader />;

  return (
    <div className="min-h-screen w-full mt-[10vh] p-4 md:p-6 lg:p-8 bg-background relative">
      <GenderModal user={user} setUser={handleGenderUpdate} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">

            <ScrollSection>
              <GreetingSection userName={user?.fullName || "User"} />
            </ScrollSection>

            <ScrollSection>
              <WeatherDashboardPro data={weatherData} />
            </ScrollSection>

            <ScrollSection>
              {isLoadingAI ? (
                <div className="h-[400px] w-full bg-gray-100/50 animate-pulse rounded-3xl border" />
              ) : (
                <OutfitRecommendation outfitData={aiData?.outfit} />
              )}
            </ScrollSection>

            <ScrollSection>
              {isLoadingAI ? (
                <div className="h-[300px] w-full bg-gray-100/50 animate-pulse rounded-3xl border" />
              ) : (
                <ActivitySuggestions activities={aiData?.activity} />
              )}
            </ScrollSection>
          </div>
          <div className="hidden lg:block lg:col-span-1 space-y-6 lg:space-y-8">
            <div className="lg:sticky lg:top-6 lg:self-start">
              <ProfileCard user={user} onSave={handleSaveProfile} />
              <NotificationSettings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
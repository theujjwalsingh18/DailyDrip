import React, { useState, useEffect } from "react";
import GreetingSection from "./components/GreetingSection";
import WeatherDashboardPro from "./Weather/WeatherDashboardPro";
import ProfileCard from "./ProfileSection/ProfileCard";
import NotificationSettings from "./ProfileSection/NotificationSettings";
import OutfitRecommendation from "./OutfitSection/OutfitRecommendation";
import OutfitRecommendationSkeleton from "./OutfitSection/OutfitRecommendationSkeleton";
import ActivitySuggestionsSkeleton from "./ActivitySection/ActivitySuggestionsSkeleton";
import ActivitySuggestions from "./ActivitySection/ActivitySuggestions";
import ScrollSection from "@/components/ScrollSection";
import useAuth from "@/context/AuthContext";
import GenderModal from "./components/GenderModal";
import DripLoader from "@/components/ui/DripLoader";
import useToast from "@/hooks/useToast";
import LocationMissingCard from "./components/LocationMissingCard";
import { useDashboardData } from "@/hooks/useDashboardData"; 

export default function Dashboard() {
  const { user, fetchMe } = useAuth();
  const { 
    weatherData, 
    aiData, 
    isLoadingWeather, 
    isLoadingAI, 
    isLocationMissing 
  } = useDashboardData(user, fetchMe);

  const { successToast, warningToast, errorToast } = useToast();
  const [reminderCount, setReminderCount] = useState(0);
  const [userDismissed, setUserDismissed] = useState(false);
  useEffect(() => {
    if (!user) return;
    const hasLocation = user.location?.lat && user.location?.lon;
    if (hasLocation) return;
    if (userDismissed || reminderCount >= 3) return;

    const timer = setTimeout(() => {
      if (isLocationMissing) {
        warningToast("We couldn't detect your location. Please set it in your profile.");
        setReminderCount((prev) => prev + 1);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [user, reminderCount, userDismissed, isLocationMissing]);

  const handleSaveProfile = async (updatedData) => {
    try {
        const { default: api } = await import("../../api");
        await api.put("/user/update", updatedData);
        successToast("Profile saved successfully");
        await fetchMe();
    } catch {
        errorToast("Error saving profile.");
    }
  };

  const handleGenderUpdate = () => fetchMe();

  if (!user) return <DripLoader />;

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
              {isLocationMissing ? (
                <LocationMissingCard />
              ) : isLoadingWeather ? (
                <div className="h-64 w-full bg-gray-100 animate-pulse rounded-3xl" />
              ) : (
                <WeatherDashboardPro data={weatherData} />
              )}
            </ScrollSection>
            <ScrollSection>
              {isLocationMissing ? (
                <LocationMissingCard />
              ) : isLoadingAI ? (
                <OutfitRecommendationSkeleton />
              ) : (
                <OutfitRecommendation outfitData={aiData?.outfit} />
              )}
            </ScrollSection>
            <ScrollSection>
              {isLocationMissing ? (
                 <div className="hidden"></div> 
              ) : isLoadingAI ? (
                <ActivitySuggestionsSkeleton />
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
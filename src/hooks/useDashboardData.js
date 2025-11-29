import { useState, useEffect, useRef } from "react";
import api from "@/api";
import useToast from "./useToast";

const CACHE_KEY_WEATHER = "dashboard_weather_v1";
const CACHE_KEY_AI = "dashboard_ai_v1";
const CACHE_DURATION = 30 * 60 * 1000;

export function useDashboardData(user, fetchMe) {
    const [weatherData, setWeatherData] = useState(() => loadFromCache(CACHE_KEY_WEATHER));
    const [aiData, setAiData] = useState(() => loadFromCache(CACHE_KEY_AI));
    const [isLoadingWeather, setIsLoadingWeather] = useState(() => !loadFromCache(CACHE_KEY_WEATHER));
    const [isLoadingAI, setIsLoadingAI] = useState(() => !loadFromCache(CACHE_KEY_AI));
    const [isLocationMissing, setIsLocationMissing] = useState(false);

    const hasFetched = useRef(false);
    const { successToast } = useToast();

    useEffect(() => {
        if (!user) return;
        if (hasFetched.current) return;

        const executeDashboardLogic = async () => {
            hasFetched.current = true;
            setIsLocationMissing(false);

            try {
                let lat = user.location?.lat;
                let lon = user.location?.lon;

                if (!lat || !lon) {
                    try {
                        const pos = await new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                        });
                        lat = pos.coords.latitude;
                        lon = pos.coords.longitude;

                        await handleLocationUpdate(lat, lon, fetchMe, "GPS");
                        successToast("Location updated via GPS");

                    } catch (gpsError) {
                        console.warn("GPS failed, trying IP fallback...");
                        const ipLoc = await fetchIpLocation();
                        if (ipLoc) {
                            lat = ipLoc.lat;
                            lon = ipLoc.lon;
                            await api.put("/user/update", { lat, lon, location: ipLoc.details });
                            await fetchMe();
                            successToast("Location updated via Network");
                        } else {
                            setIsLocationMissing(true);
                            setIsLoadingWeather(false);
                            setIsLoadingAI(false);
                            return;
                        }
                    }
                }

                try {
                    const weatherRes = await api.get(`/combined?lat=${lat}&lon=${lon}`);
                    const freshWeather = {
                        location: weatherRes.data.location,
                        current: weatherRes.data.weather.current,
                        daily: weatherRes.data.weather.daily,
                        hourly: weatherRes.data.weather.hourly,
                    };

                    setWeatherData(freshWeather);
                    saveToCache(CACHE_KEY_WEATHER, freshWeather);
                    setIsLoadingWeather(false);
                } catch (e) {
                    console.error("Weather fetch failed", e);
                    setIsLoadingWeather(false);
                }
                try {
                    const aiRes = await api.get("/dashboard/today");
                    const freshAi = {
                        outfit: aiRes.data.outfit,
                        activity: aiRes.data.activity,
                    };

                    setAiData(freshAi);
                    saveToCache(CACHE_KEY_AI, freshAi);
                    setIsLoadingAI(false);

                    await fetchMe();
                } catch (e) {
                    console.error("AI fetch failed", e);
                    setIsLoadingAI(false);
                }

            } catch (err) {
                console.error("Critical Dashboard Error", err);
                setIsLoadingWeather(false);
                setIsLoadingAI(false);
            }
        };

        executeDashboardLogic();
    }, [user]);

    return {
        weatherData,
        aiData,
        isLoadingWeather,
        isLoadingAI,
        isLocationMissing,
    };
}

function loadFromCache(key) {
    try {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const parsed = JSON.parse(item);
        const age = Date.now() - parsed.timestamp;

        if (age > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }
        return parsed.data;
    } catch (error) {
        console.warn("Cache parse error", error);
        return null;
    }
}

function saveToCache(key, data) {
    try {
        const payload = {
            data: data,
            timestamp: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(payload));
    } catch (error) {
        console.warn("Storage quota exceeded", error);
    }
}

async function fetchIpLocation() {
    try {
        const res = await fetch("https://ipwho.is/");
        const data = await res.json();

        if (data.success && data.latitude) {
            return {
                lat: data.latitude,
                lon: data.longitude,
                details: {
                    city: data.city,
                    state: data.region,
                    country: data.country
                }
            };
        }
    } catch (error) {
        console.warn("IP Location service failed", error);
    }
    return null;
}


async function handleLocationUpdate(lat, lon, fetchMe, source) {
    try {
        let locationDetails = {};
        try {
            const reverseRes = await api.get(`/reverse?lat=${lat}&lon=${lon}`);
            if (reverseRes.data && reverseRes.data.details) {
                locationDetails = reverseRes.data.details;
            }
        } catch (e) {
            console.warn("Reverse geocode failed, saving coordinates only.");
        }
        await api.put("/user/update", {
            lat,
            lon,
            location: locationDetails
        });
        await fetchMe();

    } catch (error) {
        console.error(`Failed to save ${source} location`, error);
    }
}
import React, { useState, useEffect, useRef } from "react";
import { Mail, Send, Loader2} from "lucide-react";
import Switch from "@/components/ui/Switch";
import api from "../../api";

const TELEGRAM_BOT_URL = "https://t.me/uji_dailydrip_bot";

export default function NotificationSettings() {
  const [dailyEmail, setDailyEmail] = useState(false);
  const [dailyTelegram, setDailyTelegram] = useState(false);
  const [isTelegramConnected, setIsTelegramConnected] = useState(false);
  const [telegramVerifyCode, setTelegramVerifyCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const pollIntervalRef = useRef(null);

  const fetchUserData = async () => {
    try {
      const { data } = await api.get('/user/status');

      setDailyEmail(data.settings.dailyEmail);
      setDailyTelegram(data.settings.dailyTelegram);
      setIsTelegramConnected(data.telegramConnected);

      if (pollIntervalRef.current && data.telegramConnected) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
        setTelegramVerifyCode(null);
        setIsConnecting(false);
      }
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    return () => clearInterval(pollIntervalRef.current);
  }, []);

  useEffect(() => {
    if (telegramVerifyCode && !isTelegramConnected) {
      pollIntervalRef.current = setInterval(fetchUserData, 3000);
    }
    return () => clearInterval(pollIntervalRef.current);
  }, [telegramVerifyCode, isTelegramConnected]);

  const toggleEmail = async (newValue) => {
    setDailyEmail(newValue);
    try {
      await api.put("/user/settings", {
        settings: {
          dailyEmail: newValue,
          dailyTelegram: dailyTelegram
        }
      });
    } catch (err) {
      setDailyEmail(!newValue);
      console.error("Failed to update email:", err);
      errorToast("Failed to update setting");
    }
  };

  const toggleTelegram = async (newValue) => {
    setDailyTelegram(newValue);
    try {
      await api.put("/telegram/toggle", { enabled: newValue });
    } catch (err) {
      setDailyTelegram(!newValue);
      console.error("Failed to toggle telegram:", err);
    }
  };

  const handleConnectTelegram = async () => {
    setIsConnecting(true);
    try {
      const { data } = await api.post("/telegram/init");
      setTelegramVerifyCode(data.verifyCode);
      window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Failed to init Telegram:", err);
      setIsConnecting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md p-6 flex justify-center items-center">
        <Loader2 size={24} className="animate-spin text-gray-500" />
      </div>
    );
  }

  const renderTelegramRow = () => {
    if (isTelegramConnected) {
      return (
        <div className="flex items-center gap-3">
          <Switch value={dailyTelegram} onToggle={toggleTelegram} />
        </div>
      );
    }

    if (telegramVerifyCode) {
      return (
        <div className="text-right">
          <p className="font-medium text-xs text-gray-500 uppercase mb-1">Your Code:</p>
          <div className="flex items-center justify-end gap-3">
            <p className="text-xl font-mono font-bold text-blue-600 tracking-wider">
              {telegramVerifyCode}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 animate-pulse">
              <Loader2 size={10} /> Waiting...
            </div>
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={handleConnectTelegram}
        disabled={isConnecting}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 disabled:bg-blue-400 transition-all flex items-center gap-2"
      >
        {isConnecting ? <Loader2 size={14} className="animate-spin" /> : ""}
        Connect
      </button>
    );
  };

  return (
    <div className="w-full max-w-md rounded-3xlmx-auto bg-green rounded-3xl shadow-md border border-gray-100 p-6 sm:p-8">
      <h2 className="text-lg font-rosca italic mb-4 text-gray-800">Notifications</h2>
      <div className="flex justify-between items-center py-3 border-b border-gray-100/50">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Mail size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-700 text-sm">Email</p>
            <p className="text-gray-400 text-xs">Daily morning digest</p>
          </div>
        </div>
        <Switch value={dailyEmail} onToggle={toggleEmail} />
      </div>

      <div className="flex justify-between items-center py-3 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <Send size={18} />
          </div>
          <div>
            <p className="font-semibold text-gray-700 text-sm">Telegram</p>
            <p className="text-gray-400 text-xs">
              {isTelegramConnected ? "Connected" : "Link your account"}
            </p>
          </div>
        </div>
        {renderTelegramRow()}
      </div>
    </div>
  );
}
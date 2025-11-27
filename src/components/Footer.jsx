import React from "react";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { LinkPreview } from "./ui/LinkPreview";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center py-10 px-6 space-y-6 md:space-y-0">
        <div>
          <h2 className="text-2xl font-rosca">
            DailyDrip ☀️
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-sm">
            Your AI-powered daily weather companion — get forecasts, outfit
            suggestions, and style insights delivered via Telegram, email, and
            your dashboard.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-6">
            © 2025 DailyDrip. Built with <span className="text-red-500">❤</span>{" "}
            by the{" "}
            <LinkPreview
              url="https://theujjwalsingh.codes"
              className="font-bold text-black"
            >
              Ujjwal Singh.
            </LinkPreview>{" "}
          </div>

        </div>
        <div className="flex flex-col items-start md:items-end space-y-3">
          <nav className="flex flex-wrap gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#features" className="hover:text-gray-900 dark:hover:text-gray-200">
              Features
            </a>
            <a href="#workflow" className="hover:text-gray-900 dark:hover:text-gray-200">
              How it Works
            </a>
            <a href="mailto:theujjwalsinghh@gmail.com" className="hover:text-gray-900 dark:hover:text-gray-200">
              Contact
            </a>
          </nav>

          <div className="flex space-x-4 mt-3">
            <a
              href="https://github.com/theujjwalsingh18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600  hover:text-gray-950 transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://t.me/theujjwalsingh18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400 transition-colors"
            >
              <FaTelegramPlane size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
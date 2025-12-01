import React from "react";
import { FaGithub, FaLinkedinIn, FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { LinkPreview } from "./ui/LinkPreview";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-transparent">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center py-10 px-6 gap-8 md:gap-0">
        <div className="flex flex-col items-start w-full md:w-auto">
          <h2 className="text-2xl font-rosca text-black">
            DailyDrip ☀️
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 w-full md:max-w-sm leading-relaxed">
            Your AI-powered daily weather companion — get forecasts, outfit
            suggestions, and style insights delivered via Telegram, email, and
            your dashboard.
          </p>
          
          <div className="text-sm text-gray-500 dark:text-gray-500 mt-6">
            © 2025 DailyDrip
            <br />Built with <span className="text-red-500">❤</span>{" "}
            by the{" "}
            <LinkPreview
              url="https://theujjwalsingh.codes"
              className="font-bold text-black"
            >
              Ujjwal Singh.
            </LinkPreview>{" "}
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end w-full md:w-auto space-y-4">
          <nav className="flex flex-wrap gap-4 md:gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#features" className="hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#workflow" className="hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="mailto:theujjwalsinghh@gmail.com" className="hover:text-gray-900 transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex space-x-4">
            <a
              href="https://github.com/theujjwalsingh18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://t.me/theujjwalsingh18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400  hover:text-[#0088cc] transition-colors"
            >
              <FaTelegramPlane size={20} />
            </a>
            <a
              href="https://linkedin.com/in/theujjwalsingh18/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400  hover:text-[#0088cc] transition-colors"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://instagram.com/theujjwalsingh18/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400  hover:text-[#e7234a] transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
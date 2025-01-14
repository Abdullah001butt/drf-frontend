import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] padding-x py-9 max-container flex flex-col items-center justify-center gap-8 bg-[#F6F6F7] dark:bg-[#242535] rounded-md">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">
          404
        </h1>
        <h2 className="text-[#3B3C4A] text-4xl font-semibold max-md:leading-[2rem] lg:leading-normal lg:mx-[200px] text-center dark:text-[#BABABF]">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        <FaHome className="text-xl" />
        <span>Back to Home</span>
      </Link>

      {/* Optional: Add a fun illustration or animation */}
      <div className="mt-8">
        <div className="w-64 h-64 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-9xl">🤔</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

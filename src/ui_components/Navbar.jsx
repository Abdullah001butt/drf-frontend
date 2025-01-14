import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import ResponsiveNavBar from "./ResponsiveNavBar";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({
  darkMode,
  handleDarkMode,
  isAuthenticated,
  username,
  setUsername,
  setIsAuthenticated,
}) => {
  const [showNavBar, setShowNavBar] = useState(false);

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setUsername(null);
  }

  return (
    <>
      <nav className="w-screen padding-x py-6 flex justify-between items-center gap-6 sticky top-0 z-20 bg-[#FFFFFF]/95 backdrop-blur-sm dark:bg-[#141624]/95 shadow-lg">
        <Link
          to="/"
          className="text-[#141624] text-2xl font-bold dark:text-[#FFFFFF] hover:scale-105 transition-transform"
        >
          DevFolio
        </Link>

        <ul className="flex items-center justify-end gap-9 text-[#3B3C4A] lg:flex-1 max-md:hidden dark:text-[#FFFFFF]">
          {isAuthenticated ? (
            <>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                <Link to={`/profile/${username}`}>Hi, {username}</Link>
              </li>
              <li
                onClick={logout}
                className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="text-blue-600 dark:text-blue-400 font-medium">
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/signin"
                >
                  Login
                </NavLink>
              </li>
              <li className="text-blue-600 dark:text-blue-400 font-medium">
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/signup"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}

          <li className="text-blue-600 dark:text-blue-400 font-medium">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/create"
            >
              Create Post
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Switch onCheckedChange={handleDarkMode} checked={darkMode} />
          <div className="hidden max-md:block relative w-6 h-6">
            <GiHamburgerMenu
              className={`text-2xl cursor-pointer absolute top-0 left-0 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300
                ${
                  showNavBar
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              onClick={() => setShowNavBar(true)}
            />
            <RxCross1
              className={`text-2xl cursor-pointer absolute top-0 left-0 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300
                ${
                  showNavBar
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                }`}
              onClick={() => setShowNavBar(false)}
            />
          </div>
        </div>
      </nav>

      <div
        className={`transition-all duration-300 ease-in-out ${
          showNavBar
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <ResponsiveNavBar
          isAuthenticated={isAuthenticated}
          username={username}
          logout={logout}
        />
      </div>
    </>
  );
};

export default Navbar;

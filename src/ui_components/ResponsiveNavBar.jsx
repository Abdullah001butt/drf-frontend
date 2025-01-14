import { NavLink } from "react-router-dom";

const ResponsiveNavBar = ({ isAuthenticated, username, logout }) => {
  return (
    <nav className="max-container padding-x py-6 max-md:block hidden bg-white/95 dark:bg-[#141624]/95 backdrop-blur-sm shadow-lg">
      <ul className="flex items-center justify-center gap-6 text-[#3B3C4A] lg:flex-1 flex-col dark:text-[#FFFFFF]">
        {isAuthenticated ? (
          <>
            <li className="text-blue-600 dark:text-blue-400 font-medium hover:scale-105 transition-transform">
              Hi, {username}
            </li>
            <li
              className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors hover:scale-105"
              onClick={logout}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors hover:scale-105 ${
                    isActive ? "text-blue-600 dark:text-blue-400" : ""
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors hover:scale-105 ${
                    isActive ? "text-blue-600 dark:text-blue-400" : ""
                  }`
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer transition-colors ${
                isActive ? "bg-blue-700" : ""
              }`
            }
          >
            Create Post
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default ResponsiveNavBar;

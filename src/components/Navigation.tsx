import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface NavigationProps {
  isAuthenticated?: boolean;
  user?: User;
}

export const Navigation = ({
  isAuthenticated = false,
  user,
}: NavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/calendar", label: "Tuinkalender" },
    { path: "/plants", label: "Mijn tuin" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extract display name from user email or metadata
  const getUserDisplayName = () => {
    if (!user) return "";

    // Use user's metadata name if available
    if (user.user_metadata && user.user_metadata.name) {
      return user.user_metadata.name;
    }

    // Otherwise use the email address (without the domain part)
    if (user.email) {
      return user.email.split("@")[0];
    }

    return "User";
  };

  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="font-bold text-xl">Tuin App</div>

        {/* Hamburger menu button - only visible on mobile */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        {/* Navigation menu - responsive */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
            {isAuthenticated &&
              menuItems.map((item) => (
                <li key={item.path} className="mb-2 md:mb-0">
                  <Link
                    to={item.path}
                    className={`block p-2 hover:bg-green-600 rounded ${
                      location.pathname === item.path
                        ? "bg-green-600 font-bold"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

            {isAuthenticated ? (
              <li className="mb-2 md:mb-0 relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center p-2 hover:bg-green-600 rounded w-full text-left"
                  aria-haspopup="true"
                  aria-expanded={isProfileDropdownOpen}
                >
                  <span className="mr-1">{getUserDisplayName()}</span>
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Profile dropdown menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Account Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li className="mb-2 md:mb-0">
                <Link
                  to="/login"
                  className={`block p-2 hover:bg-green-600 rounded ${
                    location.pathname === "/login"
                      ? "bg-green-600 font-bold"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/calendar", label: "Tuinkalender" },
    { path: "/my-garden", label: "Mijn tuin" },
    { path: "/account", label: "Account" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
            {menuItems.map((item) => (
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

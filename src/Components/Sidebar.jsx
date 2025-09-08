

import React from "react";
import {
  Home,
  Compass,
  Heart,
  ListPlus,
  LogOut,
  Disc3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = ({ isMobile, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) onClose(); // ✅ Auto-close only on mobile
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white text-gray-800 p-5 border-r border-red-500 flex flex-col
          transform transition-transform duration-300 z-50
          ${isMobile ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        {/* Logo */}<button onClick={() => handleNavigate("/home")} className="mb-6 focus:outline-none">
  <img src={logo} alt="logo" className="h-10 w-auto" />
</button>

        {/* Menu */}
        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* Menu Section */}
          <div>
            <p className="text-gray-500 text-xs mb-2">Menu</p>
            <ul className="space-y-2">
              <li
                className="flex items-center gap-3 bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer"
                onClick={() => handleNavigate("/")}
              >
                <Home size={18} /> Home
              </li>

           

              <li
                className="flex items-center gap-3 hover:text-red-500 cursor-pointer"
                onClick={() => handleNavigate("/TopHits")}
              >
                <Compass size={18} /> Top Hits
              </li>

   <li
                className="flex items-center gap-3 hover:text-red-500 cursor-pointer"
                onClick={() => handleNavigate("/newrelease")}
              >
                <Disc3 size={18} /> New Release
              </li>
            </ul>
          </div>

          {/* Playlist Section */}
          <div>
            <p className="text-gray-500 text-xs mb-2">Playlist and Favorites</p>
            <ul className="space-y-2">
              <li
                className="flex items-center gap-3 hover:text-red-500 cursor-pointer"
                onClick={() => handleNavigate("/liked")}
              >
                <Heart size={18} /> Your favorites
              </li>

              <li
                className="flex items-center gap-3 hover:text-red-500 cursor-pointer"
                onClick={() => handleNavigate("/playlists")}
              >
                <ListPlus size={18} /> My Library
              </li>
            </ul>
          </div>

          {/* Settings Section */}
          <div>
            <p className="text-gray-500 text-xs mb-2">General</p>
            <ul className="space-y-2">
              <li
                className="flex items-center gap-3 hover:text-red-500 cursor-pointer"
                onClick={() => {
                  onLogout();
                  if (isMobile) onClose(); // ✅ Also close on logout (mobile only)
                }}
              >
                <LogOut size={18} /> Logout
              </li>
            </ul>
          </div>
        </div>

        {/* ✅ Mobile Login Button at bottom */}
        {isMobile && (
          <div className="mt-4">
            <button
              onClick={() => handleNavigate("/login")}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Login
            </button>
          </div>
        )}

        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        )}
      </aside>
    </>
  );
};

export default Sidebar;

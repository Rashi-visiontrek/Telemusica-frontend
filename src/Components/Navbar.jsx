

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "./Sidebar";
import axios from "axios";
import { baseUrl } from "../API/API";
import logo from "../assets/logo.png"; // ✅ add logo import
import logowhite from '../assets/logowhite.png';
import { usePlayer } from "./PlayerContext";
// import { useAudioPlayer } from "../Context/AudioPlayerContext"; // ✅ import context
import Lottie from "lottie-react";
import Loading from "../Animations/Loading.json";
const Navbar = ({ onNavigate, onSearchResults }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  // const { playSong } = useAudioPlayer(); // ✅ get playSong from context
  const { playSong } = usePlayer(); // ✅
  const navigate = useNavigate();

  // Hide dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search handler
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (!query) {
      setSearchResults([]);
      onSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}api/songs/search?q=${query}`);
      const results = res.data.data || [];
      setSearchResults(results);
      onSearchResults(results);
      setLoading(false);
    } catch (err) {
      console.error("Search API error:", err);
      setLoading(false);
    }
  };

  // When user selects a song
  const handleSelect = (song) => {
    setSearchText("");
    setSearchResults([]);
    playSong(song); // ✅ play globally
  };

  return (
    <>
   <nav className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white shadow-md">
        {/* Left: Mobile logo + menu button */}
        <div className="flex items-center space-x-3">
          <button
            className="lg:hidden text-white hover:text-red-200"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          {/* ✅ Logo for mobile */}
       {/* ✅ Logo with navigation */}
          <button onClick={() => navigate("/home")} className="focus:outline-none">
            <img
              src={logowhite}
              alt="Logo"
              className="h-8 w-auto lg:hidden"
            />
          </button>

          {/* Search (desktop only) */}
          <input
            type="text"
            placeholder="Search For Musics, Artists, ..."
            className="hidden md:block w-64 px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchText}
            onChange={handleSearch}
          />
        </div>

        {/* ✅ Searchbar on mobile (right side) */}
        <div className="flex-1 flex justify-end md:hidden lg:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-xs px-3 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchText}
            onChange={handleSearch}
          />
        </div>

        {/* Right: Login/Signup (desktop only) */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="px-4 py-1 border border-white text-white rounded-lg hover:bg-white hover:text-red-600 transition">
            Login
          </button>
          <button className="px-4 py-1 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Dropdown */}
      {searchResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-16 left-1/2 transform -translate-x-1/2 w-72 bg-white shadow-lg rounded-lg z-50 max-h-60 overflow-y-auto"
        >
          {searchResults.map((song) => (
            <div
              key={song.id}
              className="px-4 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleSelect(song)}
            >
              {song.img_url && (
                <img
                  src={song.img_url}
                  alt={song.name}
                  className="w-8 h-8 rounded"
                />
              )}
              <div>
                <p className="text-gray-900 font-medium text-sm">{song.name}</p>
                <p className="text-gray-500 text-xs">{song.album}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <Sidebar
            isMobile={true}
            onClose={() => setMenuOpen(false)}
            onNavigate={(page) => {
              onNavigate(page);
              setMenuOpen(false);
            }}
          />
        </div>
      )}

      {loading && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded shadow-md z-50">
          Searching...
        </div>
      )}
    </>
  );
};

export default Navbar;



// src/Components/Playbar.jsx
import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { baseUrl } from "../API/API";
import { usePlayer } from "./PlayerContext";

const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const Playbar = () => {
  const { currentSong, isPlaying, togglePlay, currentTime, duration, seek } = usePlayer();
  const [likedSongs, setLikedSongs] = useState({});
  const [popupMessage, setPopupMessage] = useState(null);

  if (!currentSong) return null; // Hide if no song selected

  // const toggleLike = async (songId, songDbId) => {
  //   setLikedSongs((prev) => {
  //     const isLiked = !prev[songId];
  //     if (isLiked) {
  //       setPopupMessage("Song added to Liked Songs ❤️");
  //       axios.post(`${baseUrl}api/liked-songs/${songDbId}`).catch(console.error);
  //     } else {
  //       setPopupMessage("Song removed from Liked Songs 💔");
  //     }
  //     setTimeout(() => setPopupMessage(null), 2000);
  //     return { ...prev, [songId]: isLiked };
  //   });
  // };
const toggleLike = async (songId, songDbId) => {
  setLikedSongs((prev) => {
    const isLiked = !prev[songId];

    // API call
    if (isLiked) {
      axios
        .post(`${baseUrl}api/liked-songs/${songDbId}`)
        .catch((err) => console.error("Like API error:", err));
      setPopupMessage("Song added to Liked Songs ❤️");
    } else {
      axios
        .delete(`${baseUrl}api/liked-songs/${songDbId}`) // call DELETE to unlike
        .catch((err) => console.error("Unlike API error:", err));
      setPopupMessage("Song removed from Liked Songs 💔");
    }

    // Hide popup after 2s
    setTimeout(() => setPopupMessage(null), 2000);

    return { ...prev, [songId]: isLiked };
  });
};

  return (
    <>
      {/* <motion.div
        className="fixed bottom-0 left-0 right-0 bg-red-100 backdrop-blur-md shadow-lg px-6 py-4 flex items-center justify-between z-50"
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      > */}
      <motion.div
  className="fixed bottom-0 left-0 right-0 
             bg-red-100 backdrop-blur-md 
             px-6 py-4 flex items-center justify-between z-50 
             border-t-2 border-red-500 
             shadow-[0_-4px_20px_rgba(239,68,68,0.4)] rounded-t-2xl"
  initial={{ y: 80 }}
  animate={{ y: 0 }}
  transition={{ type: 'spring', stiffness: 100 }}
>

        {/* Song Info */}
        <div className="flex items-center gap-4">
          <img
            src={currentSong.img_url || "/placeholder.png"}
            alt={currentSong.name}
            className="w-14 h-14 rounded-lg object-cover shadow-md"
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{currentSong.name}</h4>
            <p className="text-sm text-gray-600">{currentSong.album}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button className="p-2 rounded-full hover:bg-gray-200 transition">
            <SkipBack size={22} />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
          >
            {isPlaying ? <Pause size={26} /> : <Play size={26} />}
          </button>

          <button className="p-2 rounded-full hover:bg-gray-200 transition">
            <SkipForward size={22} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-2 px-4">
          <span className="text-xs text-gray-600">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full accent-red-500"
          />
          <span className="text-xs text-gray-600">{formatTime(duration)}</span>
        </div>

        {/* Like Button */}
        <button
          onClick={() => toggleLike(currentSong.id.toString(), currentSong.id)}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          <Heart
            size={22}
            className={likedSongs[currentSong.id] ? "text-red-500 fill-red-500" : ""}
          />
        </button>
      </motion.div>

      {/* 🔔 Popup */}
      {popupMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-20 right-6 bg-red-500 text-white px-4 py-3 rounded-xl shadow-lg z-50"
        >
          {popupMessage}
        </motion.div>
      )}
    </>
  );
};

export default Playbar;

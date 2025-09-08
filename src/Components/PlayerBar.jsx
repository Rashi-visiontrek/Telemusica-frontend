

// src/Components/Playbar.jsx
import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Download, X } from "lucide-react";
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
  const {
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    playSong,
    nextSong,
    prevSong,   // ⬅️ from context
  } = usePlayer();

  const [likedSongs, setLikedSongs] = useState({});
  const [popupMessage, setPopupMessage] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  // Show playbar when a new song comes
  useEffect(() => {
    if (currentSong) setIsVisible(true);
  }, [currentSong]);

  // Close handler
  const handleClose = () => {
    setIsVisible(false);
    if (isPlaying) togglePlay();
    playSong(null);
  };

  if (!currentSong || !isVisible) return null;

  // Download
  const handleDownload = async (song) => {
    try {
      setPopupMessage("Download started 🎧");
      setTimeout(() => setPopupMessage(null), 2000);

      const response = await axios.get(song.audio_url, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${song.name}.mp3`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setPopupMessage("Download complete ✅");
      setTimeout(() => setPopupMessage(null), 2000);
    } catch (err) {
      console.error("Error downloading song:", err);
      setPopupMessage("Download failed ❌");
      setTimeout(() => setPopupMessage(null), 2000);
    }
  };

  // Like/unlike
  const toggleLike = async (songId, songDbId) => {
    setLikedSongs((prev) => {
      const isLiked = !prev[songId];

      if (isLiked) {
        axios.post(`${baseUrl}api/liked-songs/${songDbId}`)
          .catch((err) => console.error("Like API error:", err));
        setPopupMessage("Song added to Liked Songs ❤️");
      } else {
        axios.delete(`${baseUrl}api/liked-songs/${songDbId}`)
          .catch((err) => console.error("Unlike API error:", err));
        setPopupMessage("Song removed from Liked Songs 💔");
      }

      setTimeout(() => setPopupMessage(null), 2000);
      return { ...prev, [songId]: isLiked };
    });
  };

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-8 right-0 
                   bg-red-100 backdrop-blur-md 
                   px-6 py-4 flex items-center justify-center z-40 
                   border-t-2 border-red-500 
                   shadow-[0_-4px_20px_rgba(239,68,68,0.4)] rounded-t-2xl"
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {/* Song Info */}
      {/* Song Info */}
<div className="flex items-center gap-4">
  <img
    src={currentSong.img_url || "/placeholder.png"}
    alt={currentSong.name}
    className="w-14 h-14 rounded-lg object-cover shadow-md"
  />
  <div className="hidden md:block">
    <h4 className="text-lg font-semibold text-gray-900">{currentSong.name}</h4>
    <p className="text-sm text-gray-600">{currentSong.album}</p>
  </div>
</div>


        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={prevSong}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <SkipBack size={22} />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
          >
            {isPlaying ? <Pause size={26} /> : <Play size={26} />}
          </button>

          <button
            onClick={nextSong}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
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

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => handleDownload(currentSong)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Download size={20} />
          </button>

          <button
            onClick={() => toggleLike(currentSong.id.toString(), currentSong.id)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Heart
              size={22}
              className={likedSongs[currentSong.id] ? "text-red-500 fill-red-500" : ""}
            />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-full hover:bg-red-200 transition"
        >
          <X size={22} className="text-red-500" />
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

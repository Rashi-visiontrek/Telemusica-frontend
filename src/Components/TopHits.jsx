import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl, audioAPi } from "../API/API";
import { Play, Pause, Heart, Plus, Download } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayer } from "./PlayerContext";

const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const TopHits = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [likedState, setLikedState] = useState({});
  const [addedSongs, setAddedSongs] = useState({});
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState("info"); // success | error | info
  const songRefs = useRef({});
  const { currentSong, isPlaying, playSong, togglePlay, currentTime, seek } =
    usePlayer();

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await axios.get(`${baseUrl}${audioAPi}`);
        const allSongs = response.data.data || [];

        // ✅ Pick 2 songs per album
        const grouped = allSongs.reduce((acc, song) => {
          if (!acc[song.album]) acc[song.album] = [];
          acc[song.album].push(song);
          return acc;
        }, {});

        let selected = [];
        Object.values(grouped).forEach((albumSongs) => {
          selected.push(...albumSongs.slice(0, 2));
        });

        setTopSongs(selected);

        // Fetch liked songs
        const likedRes = await axios.get(`${baseUrl}api/liked-songs`);
        const likedArr = likedRes.data.data || [];
        const likedObj = {};
        likedArr.forEach((s) => {
          likedObj[s.id] = true;
        });
        setLikedState(likedObj);
      } catch (err) {
        console.error("Error fetching top songs:", err);
      }
    };

    fetchTopSongs();
  }, []);

  const toggleLike = async (song) => {
    try {
      const isLiked = likedState[song.id];
      if (isLiked) {
        await axios.delete(`${baseUrl}api/liked-songs/${song.id}`);
        setLikedState((prev) => ({ ...prev, [song.id]: false }));
      } else {
        await axios.post(`${baseUrl}api/liked-songs/${song.id}`);
        setLikedState((prev) => ({ ...prev, [song.id]: true }));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleAdded = async (song) => {
    setAddedSongs((prev) => {
      const isAdded = !prev[song.id];
      if (isAdded) {
        setPopupMessage("Song added to your library 🎶");
        setPopupType("success");
        axios.post(`${baseUrl}api/playlist/${song.id}`).catch(console.error);
      } else {
        setPopupMessage("Song removed from your library ❌");
        setPopupType("error");
      }
      setTimeout(() => setPopupMessage(null), 2000);
      return { ...prev, [song.id]: isAdded };
    });
  };

  const handleDownload = async (song) => {
    try {
      setPopupMessage("Download started 🎧");
      setPopupType("info");
      setTimeout(() => setPopupMessage(null), 2000);

      const response = await axios.get(song.audio_url, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${song.name}.mp3`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setPopupMessage("Download complete ✅");
      setPopupType("success");
      setTimeout(() => setPopupMessage(null), 2000);
    } catch (err) {
      console.error("Error downloading song:", err);
      setPopupMessage("Download failed ❌");
      setPopupType("error");
      setTimeout(() => setPopupMessage(null), 2000);
    }
  };

  return (
    <section className="px-6 lg:px-16 py-10 bg-gradient-to-b from-white to-gray-50">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">
        Top <span className="text-red-500">Hits</span>
      </h2>

      {/* <div className="flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-hide snap-x snap-mandatory scroll-smooth"> */}
       <div
  className="flex overflow-x-auto gap-6 pb-6 px-2 scrollbar-hide 
             snap-x snap-mandatory scroll-smooth"
  style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
>

 {topSongs.map((song, index) => (
          <motion.div
            key={song.id}
            ref={(el) => (songRefs.current[song.id] = el)}
            className="w-60 flex-shrink-0 snap-start rounded-2xl p-[2px] 
                       bg-gradient-to-br from-red-500/80 via-red-400/70 to-red-600/90 
                       shadow-xl hover:z-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center shadow-md">
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                {song.img_url ? (
                  <img
                    src={song.img_url}
                    alt={song.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Album Art</span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold mt-4 text-gray-900 truncate w-full text-center">
                {song.name}
              </h3>
              <p className="text-gray-600 text-sm">{song.album}</p>

              <div className="flex gap-3  w-full items-center mt-3 flex-wrap">
          {/* Play / Pause */}
                <button
                  onClick={() =>
                    currentSong?.id === song.id ? togglePlay() : playSong(song)
                  }
                  className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause size={22} />
                  ) : (
                    <Play size={22} />
                  )}
                </button>
                {/* Add to playlist */}
                <button
                  onClick={() => toggleAdded(song)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Plus
                    size={20}
                    className={addedSongs[song.id] ? "text-red-500 fill-red-800" : ""}
                  />
                </button>

      

                {/* Like */}
                <button
                  onClick={() => toggleLike(song)}
                  className="p-2 rounded-full bg-white/80 hover:bg-white/100 shadow transition"
                >
                  <Heart
                    size={18}
                    className={likedState[song.id] ? "text-red-500 fill-red-500" : ""}
                  />
                </button>

                {/* Download */}
                <button
                  onClick={() => handleDownload(song)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Download size={20} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>
                    {currentSong?.id === song.id ? formatTime(currentTime) : "0:00"}
                  </span>
                  <span>{song.Duration}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={
                    song.Duration
                      ? song.Duration.split(":")[0] * 60 +
                        parseInt(song.Duration.split(":")[1])
                      : 0
                  }
                  value={currentSong?.id === song.id ? currentTime : 0}
                  onChange={(e) =>
                    currentSong?.id === song.id && seek(Number(e.target.value))
                  }
                  className="w-full h-1 bg-gray-300 rounded-lg cursor-pointer accent-red-500"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup messages */}
      {popupMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg z-50
            ${popupType === "success" ? "bg-green-500" : ""}
            ${popupType === "error" ? "bg-red-500" : ""}
            ${popupType === "info" ? "bg-blue-500" : ""}`}
        >
          {popupMessage}
        </motion.div>
      )}
    </section>
  );
};

export default TopHits;




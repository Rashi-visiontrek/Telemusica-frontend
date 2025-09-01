

                     
                    // ✅ Only changed progress bar logic to use PlayerContext
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { audioAPi, baseUrl } from "../API/API";
import { Play, Pause, Heart, Plus, Bold } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayer } from "./PlayerContext"; // ⬅️ import global player

const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const SongsSection = ({ searchResults, selectedSong, setSearchResults }) => {
  const [groupedSongs, setGroupedSongs] = useState({});
  const [visibleCounts, setVisibleCounts] = useState({});
  const [likedSongs, setLikedSongs] = useState([]); // ✅ fix: array instead of object
  const [addedSongs, setAddedSongs] = useState({});
  const songRefs = useRef({});
  const [popupMessage, setPopupMessage] = useState(null);
  const [likedState, setLikedState] = useState({}); // ✅ quick lookup object
  const { currentSong, isPlaying, playSong, togglePlay, currentTime, duration, seek } = usePlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${baseUrl}${audioAPi}`);
        const songs = response.data.data || [];

        // Group songs by album
        const grouped = songs.reduce((acc, song) => {
          if (!acc[song.album]) acc[song.album] = [];
          acc[song.album].push(song);
          return acc;
        }, {});
        setGroupedSongs(grouped);

        // Init visible counts
        const initialCounts = {};
        Object.keys(grouped).forEach((album) => {
          initialCounts[album] = 4;
        });
        setVisibleCounts(initialCounts);

        // Fetch liked songs
        const likedRes = await axios.get(`${baseUrl}api/liked-songs`);
        const likedSongsArr = likedRes.data.data || [];
        setLikedSongs(likedSongsArr);

        const likedObj = {};
        likedSongsArr.forEach((song) => {
          likedObj[song.id] = true;
        });
        setLikedState(likedObj);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleViewMore = (album) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [album]: Math.min(prev[album] + 4, groupedSongs[album].length),
    }));
  };

  const toggleLike = async (song) => {
    try {
      const isLiked = likedState[song.id];

      if (isLiked) {
        // Unlike → call DELETE API
        await axios.delete(`${baseUrl}api/liked-songs/${song.id}`);
        setLikedState((prev) => ({ ...prev, [song.id]: false }));
        setLikedSongs((prev) => prev.filter((s) => s.id !== song.id));
      } else {
        // Like → call POST API
        await axios.post(`${baseUrl}api/liked-songs/${song.id}`);
        setLikedState((prev) => ({ ...prev, [song.id]: true }));
        setLikedSongs((prev) => [...prev, song]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const toggleAdded = async (songId, songDbId) => {
    setAddedSongs((prev) => {
      const isAdded = !prev[songId];
      if (isAdded) {
        setPopupMessage("Song added to your playlist 🎶");
        axios.post(`${baseUrl}api/playlist/${songDbId}`).catch(console.error);
      } else {
        setPopupMessage("Song removed from your playlist ❌");
      }
      setTimeout(() => setPopupMessage(null), 2000);
      return { ...prev, [songId]: isAdded };
    });
  };

  // Search vs albums
  const isSearching = searchResults?.length > 0;
  const albumsToRender = isSearching ? { "Search Results": searchResults } : groupedSongs;

  // ✅ Autoplay if song selected from search dropdown
  useEffect(() => {
    if (selectedSong) {
      const songId = selectedSong.id.toString();
      songRefs.current[songId]?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        playSong(selectedSong);
      }, 300);
    }
  }, [selectedSong, playSong]);

  return (
    <>
      <section id="albums" className="px-6 lg:px-16 py-10 bg-gradient-to-b from-white to-gray-50">
        {Object.keys(albumsToRender).map((album, idx) => (
          <div key={idx} className="mb-14">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {album} <span className="text-red-500">Songs</span>
              </h2>

              {album === "Search Results" && (
                <button
                  onClick={() => setSearchResults([])}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition"
                >
                  Go Back
                </button>
              )}
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
              {albumsToRender[album].slice(0, visibleCounts[album]).map((song, index) => {
                const songId = song.id.toString();
                return (
                  <motion.div
                    key={song.id}
                    ref={(el) => (songRefs.current[songId] = el)}
                    className="rounded-2xl p-[2px] bg-gradient-to-br from-red-500/80 via-red-400/70 to-red-600/90 shadow-xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 flex flex-col items-center shadow-md">
                      <div className="relative w-full h-48 rounded-xl overflow-hidden">
                        {song.img_url ? (
                          <img src={song.img_url} alt={song.name} className="w-full h-full object-cover" />
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

                      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-7 w-full items-center mt-3">
                        {/* Add to playlist button */}
                        <button
                          onClick={() => toggleAdded(songId, song.id)}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        >
                          <Plus
                            size={20}
                            fontWeight={Bold}
                            className={addedSongs[songId] ? "text-red-500 fill-red-800" : ""}
                          />
                        </button>

                        {/* Play/Pause button */}
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

                        {/* Like button */}
                        <button
                          onClick={() => toggleLike(song)}
                          className="p-2 rounded-full bg-white/80 hover:bg-white/100 shadow transition ml-2"
                        >
                          <Heart size={18} className={likedState[song.id] ? "text-red-500 fill-red-500" : ""} />
                        </button>
                      </div>
 
{/* ✅ Progress bar (use API duration) */}
<div className="w-full mt-3">
  <div className="flex justify-between text-xs text-gray-600 mb-1">
    <span>
      {currentSong?.id === song.id ? formatTime(currentTime) : "0:00"}
    </span>
    <span>
      {song.Duration /* API duration string */}
    </span>
  </div>
  <input
    type="range"
    min={0}
    max={
      song.Duration
        ? song.Duration.split(":")[0] * 60 + parseInt(song.Duration.split(":")[1])
        : 0
    }
    value={currentSong?.id === song.id ? currentTime : 0}
    onChange={(e) => currentSong?.id === song.id && seek(Number(e.target.value))}
    className="w-full h-1 bg-gray-300 rounded-lg cursor-pointer accent-red-500"
  />
</div>

           
                    
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {!isSearching && visibleCounts[album] < groupedSongs[album]?.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handleViewMore(album)}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow hover:opacity-90 transition"
                >
                  View More
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* 🔔 Like/Playlist popup */}
      {popupMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-6 right-6 bg-red-500 text-white px-4 py-3 rounded-xl shadow-lg z-50"
        >
          {popupMessage}
        </motion.div>
      )}
    </>
  );
};

export default SongsSection;

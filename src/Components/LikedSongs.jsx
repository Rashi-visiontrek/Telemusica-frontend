

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../API/API";
import { Play, Pause, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayer } from "./PlayerContext"; // ✅ Use global player
import Lottie from "lottie-react";
import Loading from "../Animations/Loading.json";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedState, setLikedState] = useState({});

  // ✅ Pull everything from PlayerContext
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();

  // useEffect(() => {
  //   const fetchLikedSongs = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}api/liked-songs`);
  //       const songs = response.data.data || [];
  //       setLikedSongs(songs);

  //       // Set liked state
  //       const likedObj = {};
  //       songs.forEach((song) => {
  //         likedObj[song.id] = true;
  //       });
  //       setLikedState(likedObj);

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching liked songs:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchLikedSongs();
  // }, []);

  useEffect(() => {
  const fetchLikedSongs = async () => {
    const minLoadingTime = 3000; // 3 seconds
    const startTime = Date.now();

    try {
      const response = await axios.get(`${baseUrl}api/liked-songs`);
      const songs = response.data.data || [];
      setLikedSongs(songs);

      // Set liked state
      const likedObj = {};
      songs.forEach((song) => {
        likedObj[song.id] = true;
      });
      setLikedState(likedObj);

      // Ensure at least 3 seconds loading
      const elapsed = Date.now() - startTime;
      const remaining = minLoadingTime - elapsed;
      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      setLoading(false);
    }
  };
  fetchLikedSongs();
}, []);


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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={Loading} loop={true} className="w-48 h-48" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 md:gap-6 p-4 md:p-6 bg-gradient-to-br from-white via-red-50 to-white rounded-lg shadow-md">
        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 bg-red-300 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold rounded-full shadow-lg">
          ❤️
        </div>
        <div className="flex-1 min-w-0">
          <p className="uppercase text-xs sm:text-sm font-semibold text-gray-700">Playlist</p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 md:mb-2 truncate">Liked Songs</h1>
          <p className="text-gray-500 text-sm sm:text-base">{likedSongs.length} songs</p>
        </div>
      </div>

      {/* Songs List */}
      <div className="mt-6">
        {/* Table for medium+ screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white/30 backdrop-blur-md shadow-lg rounded-xl border border-gray-200">
            <thead className="bg-red-200/60 text-black text-sm rounded-t-xl">
              <tr>
                <th className="py-2 px-3 md:px-4 text-left">#</th>
                <th className="py-2 px-3 md:px-4 text-left">Title</th>
                <th className="py-2 px-3 md:px-4 text-left">Album</th>
                <th className="py-2 px-3 md:px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {likedSongs.map((song, index) => (
                <motion.tr
                  key={song.id}
                  className="cursor-pointer hover:bg-white/50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-2 px-3 md:px-4">{index + 1}</td>
                  <td className="py-2 px-3 md:px-4 flex items-center gap-3">
                    <img
                      src={song.img_url}
                      alt={song.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="truncate max-w-[150px] md:max-w-xs">
                      <p className="font-semibold truncate">{song.name}</p>
                      <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                    </div>
                  </td>
                  <td className="py-2 px-3 md:px-4 truncate max-w-[100px] md:max-w-xs">{song.album}</td>
                  <td className="py-2 px-3 md:px-4 flex items-center gap-2">
                    <button
                      onClick={() => currentSong?.id === song.id ? togglePlay() : playSong(song)}
                      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
                    >
                      {currentSong?.id === song.id && isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                      onClick={() => toggleLike(song)}
                      className="p-2 rounded-full bg-white/80 hover:bg-white/100 shadow transition ml-2"
                    >
                      <Heart size={18} className={likedState[song.id] ? "text-red-500 fill-red-500" : ""} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for small screens */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {likedSongs.map((song) => (
            <motion.div
              key={song.id}
              className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-4 flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={song.img_url} alt={song.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                <div className="truncate min-w-0">
                  <p className="font-semibold truncate">{song.name}</p>
                  <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                  <p className="text-xs text-gray-400 truncate">{song.album}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => currentSong?.id === song.id ? togglePlay() : playSong(song)}
                  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
                >
                  {currentSong?.id === song.id && isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={() => toggleLike(song)}
                  className="p-2 rounded-full bg-white/80 hover:bg-white/100 shadow transition"
                >
                  <Heart size={18} className={likedState[song.id] ? "text-red-500 fill-red-500" : ""} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;

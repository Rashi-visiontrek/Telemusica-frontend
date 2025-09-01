import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  const toggleLike = (song) => {
    if (likedSongs.find((s) => s.id === song.id)) {
      // remove
      setLikedSongs(likedSongs.filter((s) => s.id !== song.id));
      toast.error("Removed from Liked Songs 💔");
    } else {
      // add
      setLikedSongs([...likedSongs, song]);
      toast.success("Added to Liked Songs ❤️");
    }
  };

  const isLiked = (id) => likedSongs.some((s) => s.id === id);

  return (
    <LikedSongsContext.Provider value={{ likedSongs, toggleLike, isLiked }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

export const useLikedSongs = () => useContext(LikedSongsContext);

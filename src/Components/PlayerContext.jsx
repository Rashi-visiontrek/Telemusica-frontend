// // src/Components/PlayerContext.jsx
// import React, { createContext, useContext, useRef, useState } from "react";

// const PlayerContext = createContext();

// export const PlayerProvider = ({ children }) => {
//   const audioRef = useRef(null);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const playSong = (song) => {
//     if (!audioRef.current) return;

//     setCurrentSong(song);
//     audioRef.current.src = song.audio_url; // adjust field if API gives different name
//     audioRef.current.play();
//     setIsPlaying(true);
//   };

//   const togglePlay = () => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <PlayerContext.Provider
//       value={{ currentSong, isPlaying, playSong, togglePlay }}
//     >
//       {children}
//       <audio ref={audioRef} />
//     </PlayerContext.Provider>
//   );
// };

// export const usePlayer = () => useContext(PlayerContext);



// src/Components/PlayerContext.jsx
import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSong = (song) => {
    if (!audioRef.current) return;

    setCurrentSong(song);
    audioRef.current.src = song.audio_url; // adjust field if API gives different name
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Track time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Seek
  const seek = (time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        playSong,
        togglePlay,
        seek,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);

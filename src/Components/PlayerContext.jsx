


// // src/Components/PlayerContext.jsx
// import React, { createContext, useContext, useRef, useState, useEffect } from "react";

// const PlayerContext = createContext();

// export const PlayerProvider = ({ children }) => {
//   const audioRef = useRef(null);
//   const [currentSong, setCurrentSong] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

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

//   // Track time and duration
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const updateDuration = () => setDuration(audio.duration || 0);
//     const handleEnded = () => setIsPlaying(false);

//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", updateDuration);
//     audio.addEventListener("ended", handleEnded);

//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", updateDuration);
//       audio.removeEventListener("ended", handleEnded);
//     };
//   }, []);

//   // Seek
//   const seek = (time) => {
//     if (!audioRef.current) return;
//     audioRef.current.currentTime = time;
//     setCurrentTime(time);
//   };

//   return (
//     <PlayerContext.Provider
//       value={{
//         currentSong,
//         isPlaying,
//         currentTime,
//         duration,
//         playSong,
//         togglePlay,
//         seek,
//       }}
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
  const [playlist, setPlaylist] = useState([]);       // ⬅️ all songs in context
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ▶️ Play specific song (with optional playlist)
  const playSong = (song, songs = []) => {

    if (!audioRef.current || !song) return;
 console.log("🎵 playSong called:", song.name);

    if (songs.length > 0) {
      setPlaylist(songs);
     const index = songs.findIndex((s) => s.id === song.id);
 console.log("📀 playlist size:", songs.length, "currentIndex:", index);  
   setCurrentIndex(index !== -1 ? index : null);
    }

    setCurrentSong(song);
    audioRef.current.src = song.audio_url;
    audioRef.current.play();
    setIsPlaying(true);
  };

  // ⏯ Toggle play/pause
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

  // ⏭ Next song
 const nextSong = () => {
  if (!playlist.length || currentIndex === null) {
    console.log("⏭️ nextSong ignored. Playlist empty or index null.");
    return;
  }
  const nextIndex = (currentIndex + 1) % playlist.length;
  console.log("⏭️ switching to index:", nextIndex, playlist[nextIndex]?.name);
  setCurrentIndex(nextIndex);
  playSong(playlist[nextIndex], playlist);
};


  // ⏮ Previous song
 const prevSong = () => {
  if (!playlist.length || currentIndex === null) {
    console.log("⏮️ prevSong ignored. Playlist empty or index null.");
    return;
  }
  const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  console.log("⏮️ switching to index:", prevIndex, playlist[prevIndex]?.name);
  setCurrentIndex(prevIndex);
  playSong(playlist[prevIndex], playlist);
};
  // 🎵 Track time and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => nextSong(); // autoplay next

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playlist, currentIndex]);

  // ⏩ Seek
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
        nextSong,
        prevSong,   // ⬅️ expose for Playbar
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);

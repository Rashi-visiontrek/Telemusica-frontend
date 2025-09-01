


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { baseUrl } from "../API/API";
// import { Play, Pause } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const Playlists = () => {
//   const [playlists, setPlaylists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPlaylist, setCurrentPlaylist] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const response = await axios.get(`${baseUrl}api/playlist`);
//         const data = response.data.data || [];
//         setPlaylists(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching playlists:", error);
//         setLoading(false);
//       }
//     };
//     fetchPlaylists();
//   }, []);

//   // const playPlaylist = (playlist) => {
//   //   setCurrentPlaylist(playlist);
//   //   if (audioRef.current) {
//   //     audioRef.current.load();
//   //     audioRef.current.play();
//   //     setIsPlaying(true);
//   //   }
//   // };
// // 👇 inside Playlists component
// useEffect(() => {
//   if (currentPlaylist && audioRef.current) {
//     audioRef.current.load();
//     audioRef.current.play();
//     setIsPlaying(true);
//   }
// }, [currentPlaylist]);

// const playPlaylist = (playlist) => {
//   if (currentPlaylist?.id === playlist.id && isPlaying) {
//     // 🔥 If already playing, pause
//     audioRef.current.pause();
//     setIsPlaying(false);
//   } else {
//     setCurrentPlaylist(playlist); // 👈 will trigger useEffect to play
//   }
// };


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading playlists...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Hero Section */}
//       <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 p-4 md:p-6 bg-gradient-to-br from-white via-red-50 to-white rounded-lg shadow-md">
//         <div className="w-24 h-24 md:w-48 md:h-48 bg-red-300 flex items-center justify-center text-4xl md:text-7xl font-bold rounded-full shadow-lg">
//           +
//         </div>
//         <div className="text-center md:text-left">
//           <p className="uppercase text-sm font-semibold text-gray-700">Your</p>
//           <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-2">Playlists</h1>
//           <p className="text-gray-500">{playlists.length} playlists</p>
//         </div>
//       </div>

//       {/* Desktop: Table */}
//       <div className="hidden md:block overflow-x-auto mt-6">
//         <table className="min-w-full bg-white/30 backdrop-blur-md shadow-lg rounded-xl border border-gray-200">
//           <thead className="bg-red-200/60 text-black text-sm">
//             <tr>
//               <th className="py-2 px-3 md:px-4 text-left">#</th>
//               <th className="py-2 px-3 md:px-4 text-left">Playlist</th>
//               <th className="py-2 px-3 md:px-4 text-left">Songs</th>
//               <th className="py-2 px-3 md:px-4 text-left"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {playlists.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="py-4 text-center text-gray-500">
//                   No playlists yet.
//                 </td>
//               </tr>
//             ) : (
//               playlists.map((playlist, index) => (
//                 <motion.tr
//                   key={playlist.id}
//                   className="cursor-pointer hover:bg-white/50 transition-colors"
//                   whileHover={{ scale: 1.01 }}
//                 >
//                   <td className="py-2 px-3 md:px-4">{index + 1}</td>
//                   <td className="py-2 px-3 md:px-4 flex items-center gap-3">
//                     <img
//                       src={playlist.img_url}
//                       alt={playlist.name}
//                       className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
//                     />
//                     <div className="truncate max-w-[150px] md:max-w-xs">
//                       <p className="font-semibold truncate">{playlist.album}</p>
//                       <p className="text-xs text-gray-500 truncate">{playlist.creator || "You"}</p>
//                     </div>
//                   </td>
//                   <td className="py-2 px-3 md:px-4">{playlist.name}</td>
//                   <td className="py-2 px-3 md:px-4">
//                     <button
//                       onClick={() => playPlaylist(playlist)}
//                       className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
//                     >
//                       {currentPlaylist?.id === playlist.id && isPlaying ? (
//                         <Pause size={20} />
//                       ) : (
//                         <Play size={20} />
//                       )}
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile: Card Layout */}
//       <div className="md:hidden grid grid-cols-1 gap-4 mt-6">
//         {playlists.length === 0 ? (
//           <p className="text-gray-500 text-center">No playlists yet.</p>
//         ) : (
//           playlists.map((playlist, index) => (
//             <motion.div
//               key={playlist.id}
//               className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-4 flex items-center justify-between"
//               whileHover={{ scale: 1.02 }}
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={playlist.img_url}
//                   alt={playlist.name}
//                   className="w-14 h-14 rounded-lg object-cover"
//                 />
//                 <div className="truncate">
//                   <p className="font-semibold truncate">{playlist.album}</p>
//                   <p className="text-xs text-gray-500 truncate">{playlist.creator || "You"}</p>
//                   <p className="text-xs text-gray-400 truncate">{playlist.name}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => playPlaylist(playlist)}
//                 className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
//               >
//                 {currentPlaylist?.id === playlist.id && isPlaying ? (
//                   <Pause size={20} />
//                 ) : (
//                   <Play size={20} />
//                 )}
//               </button>
//             </motion.div>
//           ))
//         )}
//       </div>

//       {/* Now Playing Bar */}
//       <AnimatePresence>
//         {currentPlaylist && (
//           <motion.div
//             initial={{ y: 100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 100, opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-xl border-t border-gray-200 p-4 flex items-center justify-between z-50"
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 src={currentPlaylist.img_url}
//                 alt={currentPlaylist.name}
//                 className="w-14 h-14 rounded-lg object-cover"
//               />
//               <div>
//                 <h4 className="font-semibold text-gray-900 truncate max-w-[200px]">
//                   {currentPlaylist.name}
//                 </h4>
//                 <p className="text-sm text-gray-600 truncate max-w-[200px]">
//                   {currentPlaylist.album} Songs
//                 </p>
//               </div>
//             </div>
//             <div className="flex-1 px-6">
//               <audio
//                 ref={audioRef}
//                 controls
//                 className="w-full"
//                 onPlay={() => setIsPlaying(true)}
//                 onPause={() => setIsPlaying(false)}
//                 onEnded={() => setIsPlaying(false)}
//               >
//                 <source src={currentPlaylist.audio_url} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Playlists;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../API/API";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { usePlayer } from "./PlayerContext"; // ✅ use global player
import Lottie from "lottie-react";
import Loading from "../Animations/Loading.json";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ pull from PlayerContext
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayer();

  useEffect(() => {
  const fetchPlaylists = async () => {
    const minLoadingTime = 3000; // 3 seconds
    const startTime = Date.now();

    try {
      const response = await axios.get(`${baseUrl}api/playlist`);
      const data = response.data.data || [];
      setPlaylists(data);

      // Ensure at least 3 seconds loading
      const elapsed = Date.now() - startTime;
      const remaining = minLoadingTime - elapsed;
      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setLoading(false);
    }
  };

  fetchPlaylists();
}, []);


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
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 p-4 md:p-6 bg-gradient-to-br from-white via-red-50 to-white rounded-lg shadow-md">
        <div className="w-24 h-24 md:w-48 md:h-48 bg-red-300 flex items-center justify-center text-4xl md:text-7xl font-bold rounded-full shadow-lg">
          +
        </div>
        <div className="text-center md:text-left">
          <p className="uppercase text-sm font-semibold text-gray-700">Your</p>
          <h1 className="text-2xl md:text-5xl font-bold mb-1 md:mb-2">Playlists</h1>
          <p className="text-gray-500">{playlists.length} playlists</p>
        </div>
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block overflow-x-auto mt-6">
        <table className="min-w-full bg-white/30 backdrop-blur-md shadow-lg rounded-xl border border-gray-200">
          <thead className="bg-red-200/60 text-black text-sm">
            <tr>
              <th className="py-2 px-3 md:px-4 text-left">#</th>
              <th className="py-2 px-3 md:px-4 text-left">Playlist</th>
              <th className="py-2 px-3 md:px-4 text-left">Songs</th>
              <th className="py-2 px-3 md:px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {playlists.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No playlists yet.
                </td>
              </tr>
            ) : (
              playlists.map((playlist, index) => (
                <motion.tr
                  key={playlist.id}
                  className="cursor-pointer hover:bg-white/50 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="py-2 px-3 md:px-4">{index + 1}</td>
                  <td className="py-2 px-3 md:px-4 flex items-center gap-3">
                    <img
                      src={playlist.img_url}
                      alt={playlist.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
                    />
                    <div className="truncate max-w-[150px] md:max-w-xs">
                      <p className="font-semibold truncate">{playlist.album}</p>
                      <p className="text-xs text-gray-500 truncate">{playlist.creator || "You"}</p>
                    </div>
                  </td>
                  <td className="py-2 px-3 md:px-4">{playlist.name}</td>
                  <td className="py-2 px-3 md:px-4">
                    <button
                      onClick={() =>
                        currentSong?.id === playlist.id ? togglePlay() : playSong(playlist)
                      }
                      className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
                    >
                      {currentSong?.id === playlist.id && isPlaying ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card Layout */}
      <div className="md:hidden grid grid-cols-1 gap-4 mt-6">
        {playlists.length === 0 ? (
          <p className="text-gray-500 text-center">No playlists yet.</p>
        ) : (
          playlists.map((playlist) => (
            <motion.div
              key={playlist.id}
              className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-4 flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={playlist.img_url}
                  alt={playlist.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="truncate">
                  <p className="font-semibold truncate">{playlist.album}</p>
                  <p className="text-xs text-gray-500 truncate">{playlist.creator || "You"}</p>
                  <p className="text-xs text-gray-400 truncate">{playlist.name}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  currentSong?.id === playlist.id ? togglePlay() : playSong(playlist)
                }
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition"
              >
                {currentSong?.id === playlist.id && isPlaying ? (
                  <Pause size={20} />
                ) : (
                  <Play size={20} />
                )}
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Playlists;

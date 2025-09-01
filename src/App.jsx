
// // // import React, { useState, useEffect } from "react";
// // // import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// // // import Navbar from "./Components/Navbar";
// // // import Sidebar from "./Components/Sidebar";
// // // import Hero from "./Components/Hero";
// // // import WeeklyTopSongs from "./Components/WeeklyTopSongs";
// // // import NewRelease from "./Components/NewRelease";
// // // import PopularArtists from "./Components/PopularArtists";
// // // import TrendingSongs from "./Components/TrendingSongs";
// // // import MusicVideos from "./Components/MusicVideos";
// // // import TopAlbums from "./Components/TopAlbums";
// // // import LikedSongs from "./Components/LikedSongs";
// // // import Playlists from "./Components/Playlists";
// // // import Login from "./Pages/LoginPage";
// // // import SongsSection from "./Components/SongsSection";
// // // import { Toaster } from "react-hot-toast";

// // // function Home({ searchResults, autoPlaySong }) {
// // //   const location = useLocation();

// // //   useEffect(() => {
// // //     if (location.state?.scrollTo) {
// // //       const section = document.getElementById(location.state.scrollTo);
// // //       if (section) {
// // //         setTimeout(() => {
// // //           section.scrollIntoView({ behavior: "smooth" });
// // //         }, 300);
// // //       }
// // //     }
// // //   }, [location.state]);

// // //   return (
// // //     <>
// // //       <Hero />
// // //       {/* <WeeklyTopSongs />
// // //       <NewRelease />
// // //       <PopularArtists />
// // //       <TrendingSongs />
// // //       <MusicVideos />
// // //       <TopAlbums /> */}
// // //       {/* <SongsSection searchResults={searchResults} selectedSong={autoPlaySong} /> */}
// // // {!searchResults?.length > 0 && <Hero />}
// // // <SongsSection 
// // //   searchResults={searchResults} 
// // //   selectedSong={selectedSong} 
// // //   setSearchResults={setSearchResults} 
// // // />
// // //       <Toaster position="bottom-center" toastOptions={{ duration: 1500 }} />
// // //     </>
// // //   );
// // // }

// // // function App() {
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [autoPlaySong, setAutoPlaySong] = useState(null);

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white text-gray-900 overflow-x-hidden">
// // //       <div className="min-h-screen flex flex-col lg:flex-row">
// // //         {/* Sidebar */}
// // //         <div className="lg:block hidden">
// // //           <Sidebar onLogout={() => setIsLoggedIn(false)} />
// // //         </div>

// // //         {/* Main Content */}
// // //         <div className="flex-1 p-1 lg:ml-64">
// // //           <Navbar
// // //             onSearchResults={setSearchResults}
// // //             onPlaySong={(song) => setAutoPlaySong(song)}
// // //           />

// // //           <Routes>
// // //             {/* Redirect root to /home */}
// // //             <Route path="/" element={<Navigate to="/home" replace />} />

// // //             <Route
// // //               path="/home"
// // //               element={
// // //                 <Home
// // //                   searchResults={searchResults}
// // //                   autoPlaySong={autoPlaySong}
// // //                 />
// // //               }
// // //             />
// // //             <Route path="/liked" element={<LikedSongs />} />
// // //             <Route path="/playlists" element={<Playlists />} />
// // //             <Route path="/login" element={<Login />} />
// // //           </Routes>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;


// // import React, { useState, useEffect } from "react";
// // import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// // import Navbar from "./Components/Navbar";
// // import Sidebar from "./Components/Sidebar";
// // import Hero from "./Components/Hero";
// // import WeeklyTopSongs from "./Components/WeeklyTopSongs";
// // import NewRelease from "./Components/NewRelease";
// // import PopularArtists from "./Components/PopularArtists";
// // import TrendingSongs from "./Components/TrendingSongs";
// // import MusicVideos from "./Components/MusicVideos";
// // import TopAlbums from "./Components/TopAlbums";
// // import LikedSongs from "./Components/LikedSongs";
// // import Playlists from "./Components/Playlists";
// // import Login from "./Pages/LoginPage";
// // import SongsSection from "./Components/SongsSection";
// // import { Toaster } from "react-hot-toast";
// // import { PlayerProvider } from "./context/PlayerContext";

// // function Home({ searchResults, autoPlaySong, setSearchResults }) {
// //   const location = useLocation();

// //   useEffect(() => {
// //     if (location.state?.scrollTo) {
// //       const section = document.getElementById(location.state.scrollTo);
// //       if (section) {
// //         setTimeout(() => {
// //           section.scrollIntoView({ behavior: "smooth" });
// //         }, 300);
// //       }
// //     }
// //   }, [location.state]);

// //   return (
// //     <>
// //       {/* Show Hero only when there are NO search results */}
// //       {searchResults.length === 0 && <Hero />}

// //       {/* Songs Section will always render */}
// //       <SongsSection
// //         searchResults={searchResults}
// //         selectedSong={autoPlaySong}
// //         setSearchResults={setSearchResults}
// //       />

// //       <Toaster position="bottom-center" toastOptions={{ duration: 1500 }} />
// //     </>
// //   );
// // }

// // function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [autoPlaySong, setAutoPlaySong] = useState(null);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white text-gray-900 overflow-x-hidden">
// //       <div className="min-h-screen flex flex-col lg:flex-row">
// //         {/* Sidebar */}
// //         <div className="lg:block hidden">
// //           <Sidebar onLogout={() => setIsLoggedIn(false)} />
// //         </div>

// //         {/* Main Content */}
// //         <div className="flex-1 p-1 lg:ml-64">
// //           <Navbar
// //             onSearchResults={setSearchResults}
// //             onPlaySong={(song) => setAutoPlaySong(song)}
// //           />

// //           <Routes>
// //            <PlayerProvider>
// //             {/* Redirect root to /home */}
// //             <Route path="/" element={<Navigate to="/home" replace />} />

// //             <Route
// //               path="/home"
// //               element={
// //                 <Home
// //                   searchResults={searchResults}
// //                   autoPlaySong={autoPlaySong}
// //                   setSearchResults={setSearchResults}
// //                 />
// //               }
// //             />
// //             <Route path="/liked" element={<LikedSongs />} />
// //             <Route path="/playlists" element={<Playlists />} />
// //             <Route path="/login" element={<Login />} />
// // </PlayerProvider>
// //           </Routes>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;


// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Sidebar from "./Components/Sidebar";
// import Hero from "./Components/Hero";
// import WeeklyTopSongs from "./Components/WeeklyTopSongs";
// import NewRelease from "./Components/NewRelease";
// import PopularArtists from "./Components/PopularArtists";
// import TrendingSongs from "./Components/TrendingSongs";
// import MusicVideos from "./Components/MusicVideos";
// import TopAlbums from "./Components/TopAlbums";
// import LikedSongs from "./Components/LikedSongs";
// import Playlists from "./Components/Playlists";
// import Login from "./Pages/LoginPage";
// import SongsSection from "./Components/SongsSection";
// import { Toaster } from "react-hot-toast";
// import { PlayerProvider } from "./Components/PlayerContext";

// function Home({ searchResults, autoPlaySong, setSearchResults }) {
//   const location = useLocation();

//   useEffect(() => {
//     if (location.state?.scrollTo) {
//       const section = document.getElementById(location.state.scrollTo);
//       if (section) {
//         setTimeout(() => {
//           section.scrollIntoView({ behavior: "smooth" });
//         }, 300);
//       }
//     }
//   }, [location.state]);

//   return (
//     <>
//       {/* Show Hero only when there are NO search results */}
//       {searchResults.length === 0 && <Hero />}

//       {/* Songs Section always renders */}
//       <SongsSection
//         searchResults={searchResults}
//         selectedSong={autoPlaySong}
//         setSearchResults={setSearchResults}
//       />

//       <Toaster position="bottom-center" toastOptions={{ duration: 1500 }} />
//     </>
//   );
// }

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [autoPlaySong, setAutoPlaySong] = useState(null);

//   return (
//     <PlayerProvider>
//       <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white text-gray-900 overflow-x-hidden">
//         <div className="min-h-screen flex flex-col lg:flex-row">
//           {/* Sidebar */}
//           <div className="lg:block hidden">
//             <Sidebar onLogout={() => setIsLoggedIn(false)} />
//           </div>

//           {/* Main Content */}
//           <div className="flex-1 p-1 lg:ml-64">
//             <Navbar
//               onSearchResults={setSearchResults}
//               onPlaySong={(song) => setAutoPlaySong(song)}
//             />

//             <Routes>
//               {/* Redirect root to /home */}
//               <Route path="/" element={<Navigate to="/home" replace />} />

//               <Route
//                 path="/home"
//                 element={
//                   <Home
//                     searchResults={searchResults}
//                     autoPlaySong={autoPlaySong}
//                     setSearchResults={setSearchResults}
//                   />
//                 }
//               />
//               <Route path="/liked" element={<LikedSongs />} />
//               <Route path="/playlists" element={<Playlists />} />
//               <Route path="/login" element={<Login />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </PlayerProvider>
//   );
// }

// export default App;




// src/App.js
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Hero from "./Components/Hero";
import LikedSongs from "./Components/LikedSongs";
import Playlists from "./Components/Playlists";
import Login from "./Pages/LoginPage";
import SongsSection from "./Components/SongsSection";
import { Toaster } from "react-hot-toast";
import { PlayerProvider } from "./Components/PlayerContext";
import PlayerBar from "./Components/PlayerBar";

function Home({ searchResults, autoPlaySong, setSearchResults }) {
  return (
    <>
      {searchResults.length === 0 && <Hero />}
      <SongsSection
        searchResults={searchResults}
        selectedSong={autoPlaySong}
        setSearchResults={setSearchResults}
      />
      <Toaster position="bottom-center" toastOptions={{ duration: 1500 }} />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [autoPlaySong, setAutoPlaySong] = useState(null);

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white text-gray-900 overflow-x-hidden">
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="lg:block hidden">
            <Sidebar onLogout={() => setIsLoggedIn(false)} />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-1 lg:ml-64">
            <Navbar
              onSearchResults={setSearchResults}
              onPlaySong={(song) => setAutoPlaySong(song)}
            />

            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route
                path="/home"
                element={
                  <Home
                    searchResults={searchResults}
                    autoPlaySong={autoPlaySong}
                    setSearchResults={setSearchResults}
                  />
                }
              />
              <Route path="/liked" element={<LikedSongs />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* 🔴 Sticky Player */}
      <PlayerBar />
    </PlayerProvider>
  );
}

export default App;

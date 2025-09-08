

// src/App.js
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Hero from "./Components/Hero";
import LikedSongs from "./Components/LikedSongs";
import Playlists from "./Components/Playlists";
import TopHits from "./Components/TopHits";
import Login from "./Pages/LoginPage";
import SongsSection from "./Components/SongsSection";
import { Toaster } from "react-hot-toast";
import { PlayerProvider } from "./Components/PlayerContext";
import PlayerBar from "./Components/PlayerBar";
import PopularArtists from "./Components/PopularArtists";
import NewRelease from "./Components/NewRelease";

function Home({ searchResults, autoPlaySong, setSearchResults }) {
  return (
    <>
      {searchResults.length === 0 && <Hero />}
<PopularArtists/>
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
      {/* <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white text-gray-900 overflow-x-hidden"> */}
<div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-white text-gray-900 overflow-y-auto">

        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="lg:block hidden">
            <Sidebar onLogout={() => setIsLoggedIn(false)} />
          </div>

          {/* Main Content */}
          {/* <div className="flex-1 p-1 lg:ml-64 w-[70%]"> */}
{/* <div className="flex-1 px-4 py-2 lg:ml-64 w-full lg:w-[70%]">
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
              <Route path="/TopHits" element={<TopHits />} />
              <Route path="/newrelease" element={<NewRelease />} />
            </Routes>
          </div> */}
<div className="flex-1 px-4 py-2 lg:ml-64">
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
    <Route path="/TopHits" element={<TopHits />} />
    <Route path="/newrelease" element={<NewRelease />} />
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

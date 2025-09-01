
// import React, { useState } from "react";
// import Lights from '../assets/Lights.jpg'
// import levi from '../assets/levi.jpg'  
// import peaches from '../assets/peaches.jpeg' 
// import tears from '../assets/tears.jpg' 
// import stay from '../assets/stay.jpg' 
// import as from '../assets/as.jpg' 
// import flowers from '../assets/flowers.jpg' 
// import good from '../assets/good.jpeg' 
// const songs = [
//   { id: 1, title: "Blinding Lights", artist: "The Weeknd", image: Lights
//    },
//   { id: 2, title: "Levitating", artist: "Dua Lipa", image: levi },
//   { id: 3, title: "Peaches", artist: "Justin Bieber", image: peaches },
//   { id: 4, title: "Save Your Tears", artist: "The Weeknd", image: tears },
//   { id: 5, title: "Stay", artist: "The Kid LAROI", image: stay },
//   { id: 6, title: "As It Was", artist: "Harry Styles", image: as },
//   { id: 7, title: "Flowers", artist: "Miley Cyrus", image: flowers },
//   { id: 8, title: "Good 4 U", artist: "Olivia Rodrigo", image: good},
// ];

// const NewRelease = () => {
//   const [visibleCount, setVisibleCount] = useState(4);

//   const handleViewMore = () => {
//     setVisibleCount((prev) => Math.min(prev + 4, songs.length));
//   };

//   return (
//     <section className="px-6 lg:px-16 py-10 bg-black">
//       {/* Section Title */}
//       <h2 className="text-2xl font-bold mb-6">
//       New Release <span className="text-pink-500">Songs</span>
//       </h2>

//       {/* Scroll container for mobile */}
//       <div className="overflow-x-auto lg:overflow-visible">
//         <div className="flex gap-6 snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
//           {songs.slice(0, visibleCount).map((song) => (
//             <div
//               key={song.id}
//               className="min-w-[200px] lg:min-w-0 snap-start rounded-xl p-[2px] bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 hover:scale-105 transition-transform duration-300"
//             >
//               <div className="bg-black rounded-xl p-4 flex flex-col items-center">
//                 <div className="relative w-full h-40 rounded-lg overflow-hidden group">
//                   <img
//                     src={song.image}
//                     alt={song.title}
//                     className="w-full h-full object-cover"
//                   />
//                   {/* Overlay on hover */}
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                     <button className="px-4 py-2 bg-pink-500 text-black font-semibold rounded-lg hover:bg-pink-600 transition">
//                       ▶ Play
//                     </button>
//                   </div>
//                 </div>
//                 <h3 className="text-base font-semibold mt-3">{song.title}</h3>
//                 <p className="text-gray-400 text-xs">{song.artist}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* View More Button */}
//       {visibleCount < songs.length && (
//         <div className="hidden lg:flex justify-center mt-6">
//           <button
//             onClick={handleViewMore}
//             className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition"
//           >
//             View More
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default NewRelease;

import React, { useState } from "react";
import Lights from "../assets/Lights.jpg";
import levi from "../assets/levi.jpg";
import peaches from "../assets/peaches.jpeg";
import tears from "../assets/tears.jpg";
import stay from "../assets/stay.jpg";
import as from "../assets/as.jpg";
import flowers from "../assets/flowers.jpg";
import good from "../assets/good.jpeg";
import Lottie from "lottie-react";
import play from '../Animations/play.json'

const songs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", image: Lights },
  { id: 2, title: "Levitating", artist: "Dua Lipa", image: levi },
  { id: 3, title: "Peaches", artist: "Justin Bieber", image: peaches },
  { id: 4, title: "Save Your Tears", artist: "The Weeknd", image: tears },
  { id: 5, title: "Stay", artist: "The Kid LAROI", image: stay },
  { id: 6, title: "As It Was", artist: "Harry Styles", image: as },
  { id: 7, title: "Flowers", artist: "Miley Cyrus", image: flowers },
  { id: 8, title: "Good 4 U", artist: "Olivia Rodrigo", image: good },
];

const TopAlbums = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, songs.length));
  };

  return (
    <section id='albums' className="px-6 lg:px-16 py-10 bg-white">
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-6 text-black">
        Top <span className="text-red-500">Albums</span>
      </h2>

      {/* Scroll container */}
      <div className="overflow-x-auto lg:overflow-visible">
        <div className="flex gap-6 snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {songs.slice(0, visibleCount).map((song) => (
            <div
              key={song.id}
              className="min-w-[200px] lg:min-w-0 snap-start rounded-xl p-[2px] 
              bg-gradient-to-br from-red-500 via-red-400 to-red-600 
              hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow-lg">
                <div className="relative w-full h-40 rounded-lg overflow-hidden group">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-red-100/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {/* <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                      ▶ Play
                    </button> */}
                      <Lottie animationData={play} loop={true}  style={{ height: 50, width: 50 }}/>
                  </div>
                </div>
                <h3 className="text-base font-semibold mt-3 text-black">{song.title}</h3>
                <p className="text-gray-600 text-xs">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      {visibleCount < songs.length && (
        <div className="hidden lg:flex justify-center mt-6">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:opacity-90 transition"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default TopAlbums;

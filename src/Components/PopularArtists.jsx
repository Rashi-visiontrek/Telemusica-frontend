import React, { useState } from "react";
import emi from "../assets/eminem.webp";
import weeknd from "../assets/weekend.jpg";
import Adele from "../assets/Adele.webp";
import lana from "../assets/lana.avif";
import harry from "../assets/harry.jpg";
// import billie from "../assets/billie.jpg";
// import taylor from "../assets/taylor.jpg";
// import drake from "../assets/drake.jpg";
import Lottie from "lottie-react";
import play from "../Animations/play.json";

const artists = [
  { id: 1, name: "Eminem", image: emi },
  { id: 2, name: "The Weeknd", image: weeknd },
  { id: 3, name: "Adele", image: Adele },
  { id: 4, name: "Lana Del Rey", image: lana },
  { id: 5, name: "Harry Styles", image: harry },
  { id: 6, name: "Lana Del Rey", image: lana },
  { id: 7, name: "Harry Styles", image: harry },
    { id: 8, name: "The Weeknd", image: weeknd },
//   { id: 6, name: "Billie Eilish", image: billie },
//   { id: 7, name: "Taylor Swift", image: taylor },
//   { id: 8, name: "Drake", image: drake },
];

const PopularArtists = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, artists.length));
  };

  return (
    <section id='Artists' className="px-6 lg:px-16 py-10 bg-white">
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-6 text-black">
        Popular <span className="text-red-500">Artists</span>
      </h2>

      {/* Scroll container */}
      <div className="overflow-x-auto lg:overflow-visible">
        <div className="flex gap-6 snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {artists.slice(0, visibleCount).map((artist) => (
            // <div
            //   key={artist.id}
            //   className="min-w-[200px] lg:min-w-0 snap-start rounded-full p-[2px]
            //   bg-gradient-to-br from-red-500 via-red-400 to-red-600
            //   hover:scale-105 transition-transform duration-300"
            // >
            //   <div className="bg-white rounded-full p-4 flex flex-col items-center shadow-lg">
            //     <div className="relative w-full h-40 rounded-full overflow-hidden group">
            //       <img
            //         src={artist.image}
            //         alt={artist.name}
            //         className="w-full h-full object-cover"
            //       />
               
            //     </div>
            //     <h3 className="text-base font-semibold mt-3 text-black">{artist.name}</h3>
            //   </div>
            // </div>
            <div
  key={artist.id}
  className="min-w-[160px] lg:min-w-0 snap-start flex flex-col items-center hover:scale-105 transition-transform duration-300"
>
  {/* Circle image with gradient border */}
  <div className="p-[3px] rounded-full bg-gradient-to-br from-red-500 via-red-400 to-red-600">
    <div className="w-40 h-40 rounded-full overflow-hidden">
      <img
        src={artist.image}
        alt={artist.name}
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Artist Name */}
  <h3 className="text-base font-semibold mt-3 text-black text-center">
    {artist.name}
  </h3>
</div>

          ))}
        </div>
      </div>

      {/* View More Button */}
      {visibleCount < artists.length && (
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

export default PopularArtists;

import React, { useState } from "react";
import  ASONE from "../assets/ASONE.jpeg";
import ERIC from "../assets/ERIC.jpg";
import Klash from "../assets/Klash.jpg";
import MC from "../assets/MC.jpg";
import WJ from "../assets/WJ.jpg";




const artists = [
  { id: 1, name: "AS One", image:ASONE },
  { id: 2, name: "Eric Daro", image: ERIC },
  { id: 3, name: "Klash", image: Klash },
  { id: 4, name: "MC Mario", image: MC },
  { id: 5, name: "WJ", image: WJ },

];

const PopularArtists = () => {
  const [visibleCount, setVisibleCount] = useState(5);



  return (
    <section id='Artists' className="px-6 lg:px-16 py-10 bg-white">
      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-6 text-black">
        Top Hits <span className="text-red-500">By Genre</span>
      </h2>

      {/* Scroll container */}
      <div className="overflow-x-auto lg:overflow-visible flex justify-center">

<div className="flex snap-x snap-mandatory scroll-smooth gap-4 sm:gap-7 overflow-x-auto scrollbar-hide">

          {artists.slice(0, visibleCount).map((artist) => (
//             <div
//   key={artist.id}
//   className="min-w-[160px] lg:min-w-0 snap-start flex flex-col items-center transition-transform duration-300"
// >

<div
  key={artist.id}
  onClick={() => {
    const section = document.getElementById(artist.name.replace(/\s+/g, "-").toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }}
  className="min-w-[160px] lg:min-w-0 snap-start flex flex-col items-center transition-transform duration-300 cursor-pointer"
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

    </section>
  );
};

export default PopularArtists;

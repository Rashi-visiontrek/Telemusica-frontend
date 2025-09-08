// import React, { useRef } from "react";
// import { Carousel } from "flowbite-react";
// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import WJ from "./../assets/WJ.jpg";
// import Klash from "./../assets/Klash.jpg";
// import MC from "./../assets/MC.jpg";
// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// };

// const carouselTheme = {
//   root: {
//     base: "relative h-full w-full",
//     leftControl: "absolute top-0 z-40 flex h-full items-center justify-center px-2 focus:outline-none",
//     rightControl: "absolute top-0 right-4 z-40 flex h-full items-center justify-center px-2 focus:outline-none",
//   },
//   indicators: {
//     wrapper:
//       "absolute z-40 bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center justify-center gap-3",
//     base: "h-3 w-3 rounded-full",
//     active: { off: "", on: "" },
//   },
// };

// const Hero = () => {
//   const carouselRef = useRef(null);

//   const handleSwipe = (event, info) => {
//     if (Math.abs(info.offset.x) > 80) {
//       if (info.offset.x > 0) {
//         carouselRef.current?.prev(); // swipe right → previous
//       } else {
//         carouselRef.current?.next(); // swipe left → next
//       }
//     }
//   };

//   return (
//   <section className="w-full min-h-[60vh] md:min-h-[70vh] lg:h-[60vh]">
//   <Carousel
//     ref={carouselRef}
//     slideInterval={4000}
//     indicators
//     theme={carouselTheme}
//     className="w-full h-full shadow-xl overflow-hidden"
//     leftControl={
//       <span className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full p-2 sm:p-3 shadow-md bg-black/40 hover:bg-black/60 transition">
//         <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
//       </span>
//     }
//     rightControl={
//       <span className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full p-2 sm:p-3 shadow-md bg-black/40 hover:bg-black/60 transition">
//         <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
//       </span>
//     }
//   >
//     {/* Slide 1 */}
//     <motion.div
//       drag="x"
//       dragConstraints={{ left: 0, right: 0 }}
//       onDragEnd={handleSwipe}
//       className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen flex-shrink-0"
//     >
//       <img
//         src={MC}
//         alt="Music 1"
//         className="w-full h-full object-cover"
//       />
//       {/* gradient + text overlay */}
//     </motion.div>

//     {/* Slide 2 */}
//     <motion.div
//       drag="x"
//       dragConstraints={{ left: 0, right: 0 }}
//       onDragEnd={handleSwipe}
//       className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen flex-shrink-0"
//     >
//       <img
//         src="https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1400&auto=format&fit=crop&q=60"
//         alt="Music 2"
//         className="w-full h-full object-cover"
//       />
//       {/* gradient + text overlay */}
//     </motion.div>

//     {/* Slide 3 */}
//     <motion.div
//       drag="x"
//       dragConstraints={{ left: 0, right: 0 }}
//       onDragEnd={handleSwipe}
//       className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen flex-shrink-0"
//     >
//       <img
//         src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&auto=format&fit=crop&q=60"
//         alt="Music 3"
//         className="w-full h-full object-cover"
//       />
//       {/* gradient + text overlay */}
//     </motion.div>
//   </Carousel>
// </section>

//   );
// };

// export default Hero;



import React, { useRef } from "react";
import { Carousel } from "flowbite-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WJ from "./../assets/WJ.jpg";
import Klash from "./../assets/Klash.jpg";
import MC from "./../assets/MC.jpg";

const carouselTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute top-0 z-40 flex h-full items-center justify-center px-2 focus:outline-none",
    rightControl:
      "absolute top-0 right-4 z-40 flex h-full items-center justify-center px-2 focus:outline-none",
  },
  indicators: {
    wrapper:
      "absolute z-40 bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center justify-center gap-3",
    base: "h-3 w-3 rounded-full bg-white/40",
    active: { off: "bg-white/40", on: "bg-red-500" },
  },
};

const Hero = () => {
  const carouselRef = useRef(null);

  return (
    <section className="w-full h-[80vh] lg:h-screen">
      <Carousel
        ref={carouselRef}
        slideInterval={3000} // auto slide every 3s
        indicators
        theme={carouselTheme}
        className="w-full h-full shadow-xl overflow-hidden"
        leftControl={
          <span className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-full p-2 sm:p-3 shadow-md bg-black/40 hover:bg-black/60 transition">
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </span>
        }
        rightControl={
          <span className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-full p-2 sm:p-3 shadow-md bg-black/40 hover:bg-black/60 transition">
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </span>
        }
      >
        {/* Slide 1 */}
        <div className="relative w-full h-full">
          <img
            src={MC}
            alt="Music 1"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-end p-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Feel the Music 🎶
            </h2>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1400&auto=format&fit=crop&q=60"
            alt="Music 2"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-end p-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Explore New Beats 🔥
            </h2>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&auto=format&fit=crop&q=60"
            alt="Music 3"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-end p-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Your Daily Vibes 🎧
            </h2>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Hero;

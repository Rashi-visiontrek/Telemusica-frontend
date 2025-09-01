

// import React from "react";
// import { Carousel } from "flowbite-react";
// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// };

// // Put both controls on the RIGHT, keep indicators centered & above bottom
// const carouselTheme = {
//   root: {
//     base: "relative h-full w-full",
//     leftControl:
//       "absolute top-0  z-40 flex h-full items-center justify-center px-2 focus:outline-none", // ⬅️ moved to right
//     rightControl:
//       "absolute top-0 right-4 z-40 flex h-full items-center justify-center px-2 focus:outline-none",
//   },
//   indicators: {
//     wrapper:
//       "absolute z-40 bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center justify-center gap-3",
//     // base/active are still applied, but we’ll hard-style via CSS below for reliability
//     base: "h-3 w-3 rounded-full",
//     active: {
//       off: "",
//       on: "",
//     },
//   },
// };

// const Hero = () => {
//   return (
//     <section className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh]">
//       <Carousel
//         slideInterval={4000}
//         indicators
//         theme={carouselTheme}
//         className="w-full h-full shadow-xl overflow-hidden custom-carousel"
//        leftControl={
//   <span className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full p-3 shadow-md bg-black/40 hover:bg-black/60 transition">
//     <ChevronLeft className="w-7 h-7 text-white" />
//   </span>
// }
// rightControl={
//   <span className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full p-3 shadow-md bg-black/40 hover:bg-black/60 transition">
//     <ChevronRight className="w-7 h-7 text-white" />
//   </span>
// }

//       >
//         {/* Slide 1 */}
//         <div className="relative w-full h-full">
//           <img
//             src="https://plus.unsplash.com/premium_photo-1708589336932-c7ece55e5acb?w=1400&auto=format&fit=crop&q=60"
//             alt="Music 1"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center text-white px-6">
//             <motion.h1
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg"
//             >
//               Feel the Music
//             </motion.h1>
//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: 0.2 }}
//               className="mt-4 text-base md:text-xl lg:text-2xl max-w-2xl opacity-90"
//             >
//               Stream your favorite tracks anytime, anywhere.
//             </motion.p>
//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: 0.4 }}
//               className="mt-6 flex gap-4"
//             >
//               <button className="px-6 py-3 bg-red-500 hover:bg-red-700 rounded-full text-lg font-semibold transition-all shadow-lg">
//                 Get Started
//               </button>
//               <button className="px-6 py-3 border border-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all">
//                 Learn More
//               </button>
//             </motion.div>
//           </div>
//         </div>

//         {/* Slide 2 */}
//         <div className="relative w-full h-full">
//           <img
//             src="https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1400&auto=format&fit=crop&q=60"
//             alt="Music 2"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center text-white px-6">
//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: 0.2 }}
//               className="mt-20 text-base md:text-xl lg:text-2xl max-w-2xl opacity-90"
//             >
//               Explore trending artists and curated playlists.
//             </motion.p>
//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: 0.4 }}
//               className="mt-6 flex gap-4"
//             >
//               <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-all shadow-lg">
//                 Explore
//               </button>
//               <button className="px-6 py-3 border border-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all">
//                 Join Free
//               </button>
//             </motion.div>
//           </div>
//         </div>

//         {/* Slide 3 */}
//         <div className="relative w-full h-full">
//           <img
//             src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&auto=format&fit=crop&q=60"
//             alt="Music 3"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center text-white px-6">
//             <motion.h1
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-lg"
//             >
//               Your Music, Your Way
//             </motion.h1>
//             <motion.p
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: 0.2 }}
//               className="mt-4 text-base md:text-xl lg:text-2xl max-w-2xl opacity-90"
//             >
//               Create playlists and share with friends seamlessly.
//             </motion.p>
//             <motion.div
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: 0.4 }}
//               className="mt-6 flex gap-4"
//             >
//               <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full text-lg font-semibold transition-all shadow-lg">
//                 Start Listening
//               </button>
//               <button className="px-6 py-3 border border-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all">
//                 Premium
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </Carousel>

//       {/* hard styles for indicators to guarantee visibility & sizing */}
//       <style>{`
//         /* Dots container */
//         .custom-carousel [data-testid="carousel-indicators"]{
//           bottom: 1.5rem;           /* lift above bottom */
//           gap: 10px;
//           z-index: 50;              /* above overlays */
//         }
//         /* Each dot */
//         .custom-carousel [data-testid="carousel-indicator"]{
//           width: 12px;
//           height: 12px;
//           border-radius: 9999px;
//           background: rgba(255,255,255,0.65);
//           transition: transform .2s ease, background-color .2s ease;
//         }
//         /* Active dot (Flowbite may set aria-current OR data-active) */
//         .custom-carousel [data-testid="carousel-indicator"][aria-current="true"],
//         .custom-carousel [data-testid="carousel-indicator"][data-active="true"]{
//           background: #ef4444;      /* red-500 */
//           transform: scale(1.2);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;




import React, { useRef } from "react";
import { Carousel } from "flowbite-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WJ from "./../assets/WJ.jpg";
import Klash from "./../assets/Klash.jpg";
import MC from "./../assets/MC.jpg";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const carouselTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl: "absolute top-0 z-40 flex h-full items-center justify-center px-2 focus:outline-none",
    rightControl: "absolute top-0 right-4 z-40 flex h-full items-center justify-center px-2 focus:outline-none",
  },
  indicators: {
    wrapper:
      "absolute z-40 bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center justify-center gap-3",
    base: "h-3 w-3 rounded-full",
    active: { off: "", on: "" },
  },
};

const Hero = () => {
  const carouselRef = useRef(null);

  const handleSwipe = (event, info) => {
    if (Math.abs(info.offset.x) > 80) {
      if (info.offset.x > 0) {
        carouselRef.current?.prev(); // swipe right → previous
      } else {
        carouselRef.current?.next(); // swipe left → next
      }
    }
  };

  return (
  <section className="w-full min-h-[60vh] md:min-h-[70vh] lg:h-[60vh]">
  <Carousel
    ref={carouselRef}
    slideInterval={4000}
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
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleSwipe}
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen flex-shrink-0"
    >
      <img
        src={MC}
        alt="Music 1"
        className="w-full h-full object-cover"
      />
      {/* gradient + text overlay */}
    </motion.div>

    {/* Slide 2 */}
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleSwipe}
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen flex-shrink-0"
    >
      <img
        src="https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=1400&auto=format&fit=crop&q=60"
        alt="Music 2"
        className="w-full h-full object-cover"
      />
      {/* gradient + text overlay */}
    </motion.div>

    {/* Slide 3 */}
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleSwipe}
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen flex-shrink-0"
    >
      <img
        src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&auto=format&fit=crop&q=60"
        alt="Music 3"
        className="w-full h-full object-cover"
      />
      {/* gradient + text overlay */}
    </motion.div>
  </Carousel>
</section>

  );
};

export default Hero;

// // import React, { useEffect, useRef, useState } from "react"
// import React from "react";
// const NewRelease = () => {


//   return (
// <section className="px-6 lg:px-16 py-10 bg-gradient-to-b from-white to-gray-50">
//   <h2 className="text-2xl font-bold mb-8 text-gray-900">
//     New <span className="text-red-500">Release</span>
//   </h2>

//   <div className="flex flex-col items-center justify-center py-12 text-center">
//     <p className="text-gray-500 text-lg font-medium">
//       Oops 😅 there are no new releases yet.
//     </p>
//     <p className="text-gray-400 text-sm mt-2">
//       Stay tuned — fresh tracks are coming soon!
//     </p>
//   </div>
// </section>

//   );
// };

// export default NewRelease;



import { useNavigate } from "react-router-dom";

const NewRelease = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 lg:px-16 py-10 bg-gradient-to-b from-white to-gray-50">
      <h2 className="text-2xl font-bold mb-8 text-gray-900">
        New <span className="text-red-500">Release</span>
      </h2>

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500 text-lg font-medium">
          Oops 😅 there are no new releases yet.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Stay tuned — fresh tracks are coming soon!
        </p>

        {/* Go Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Go Back to Homepage
        </button>
      </div>
    </section>
  );
};

export default NewRelease;

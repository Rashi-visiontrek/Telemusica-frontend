// TrendingSongs.jsx
import React from "react";

const TrendingSongs = () => {
  const songs = [
    {
      id: 1,
      title: "Sorfcore",
      artist: "The Neighbourhood",
      album: "Hard to Imagine the Neighbourhood Ever Changing",
      image: "https://c.saavncdn.com/632/Skyfall-Full-Length--English-2012-20191009171950-500x500.jpg",
    },
    {
      id: 2,
      title: "Skyfall Beats",
      artist: "Nightmares",
      album: "Nightmares",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKLfbG5IDEUp6chFfaZWUjkJpIFt4sByLahA&s",
    },
    {
      id: 3,
      title: "Greedy",
      artist: "Tate McRae",
      album: "Greedy",
      image: "https://a10.gaanacdn.com/gn_img/albums/g4w3vwrWjJ/w3v5RRk8Kj/size_m.jpg",
    },
    {
      id: 4,
      title: "Lovin On Me",
      artist: "Jack Harlow",
      album: "Lovin On Me",
      image: "https://i1.sndcdn.com/artworks-8zNpzxoPaE5DBELL-8GR9AA-t500x500.jpg",
    },
    {
      id: 5,
      title: "Paint The Town Red",
      artist: "Doja Cat",
      album: "Paint The Town Red",
      image: "https://m.media-amazon.com/images/M/MV5BNTJkYTNhNzktOTM5NC00MWM4LThmZDQtODQzOTYzZTQ1NWFlXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg",
    },
  ];

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        <span className="text-black">Trending</span>{" "}
        <span className="text-red-500">Songs</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="text-left text-black">
              <th className="pb-3">#</th>
              <th className="pb-3">Title</th>
              <th className="pb-3">Album</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr
                key={song.id}
                className="border-b border-red-700 hover:bg-red-500 transition"
              >
                <td className="py-3 text-black font-bold">#{index + 1}</td>
                <td className="flex items-center gap-3 py-3">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-black font-semibold">{song.title}</p>
                    <p className="text-black text-sm">{song.artist}</p>
                  </div>
                </td>
                <td className="text-black">{song.album}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrendingSongs;

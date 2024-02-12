import { useAppDispatch } from "../state/hooks";

import { createSong } from "../features/songsSlice";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export default function AddSongCard() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    // @ts-ignore

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(createSong(formData)).catch((error: Error) => {
      console.error("Error adding song:", error.message);
    });
  };

  return (
    <div className="p-6  bg-gray-300 rounded-xl">
      <form action="" className="mt-8">
        {/* Song */}
        <div>
          <label className="block uppercase tracking-wide text-gray-500  text-xs font-bold mb-2">
            Song Name
          </label>
          <input
            className="appearance-none w-full bg-otherColor text-gray-500 border rounded py-3 px-4 mb-3 text-sm leading-tight focus:outline-none bsmmd:text-md"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter song Name"
          />
        </div>

        {/* Album */}
        <div>
          <label className="block uppercase tracking-wide text-gray-500  text-xs font-bold mb-2">
            Album
          </label>
          <input
            className="appearance-none w-full bg-otherColor text-gray-500 border  rounded py-3 px-4 mb-3 text-sm leading-tight focus:outline-none bsmmd:text-md"
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
            placeholder="Enter Album Name"
          />
        </div>

        {/* Artist */}
        <div>
          <label className="block uppercase tracking-wide text-gray-500  text-xs font-bold mb-2">
            Artist
          </label>
          <input
            className="appearance-none w-full bg-otherColor text-gray-500 border  rounded py-3 px-4 mb-3 text-sm leading-tight focus:outline-none bsmmd:text-md"
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            placeholder="Enter Artist Name"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block uppercase tracking-wide text-gray-500  text-xs font-bold mb-2">
            Genre
          </label>
          <input
            className="appearance-none w-full bg-otherColor text-gray-500 border  rounded py-3 px-4 mb-3 text-sm leading-tight focus:outline-none bsmmd:text-md"
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Enter Genre Name"
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          // @ts-ignore
          onClick={(e) => handleSubmit(e)}
          className="bg-gray-400 text-md rounded px-10 py-2 hover:text-whiteText hover:bg-darkGreen transition-colors"
        >
          Add Song
        </button>
      </form>
    </div>
  );
}

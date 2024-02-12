import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "../state/hooks";

import { editSong } from "../features/songsSlice";
import { CgClose } from "react-icons/cg";

interface FormData {
  title: string;
  artist: string;
  album: string;
  genre: string;
  songId: string;
}

interface Song {
  title: string;
  artist: string;
  album: string;
  genre: string;
  _id: string;
}

interface EditSongModalProps {
  setIsModalOpen: void;
  isModalOpen: boolean;
  song: Song;
}

export default function EditSongModal({
  setIsModalOpen,
  isModalOpen,
  song,
}: EditSongModalProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    title: song.title,
    artist: song.artist,
    album: song.album,
    genre: song.genre,
    songId: song._id,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(editSong(formData))
      // @ts-ignore
      .then(setIsModalOpen)
      .catch((error) => {
        console.error("Error adding song:", error.message);
      });
  };

  return (
    isModalOpen && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-darkTransparent z-20">
        <div className=" absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 rounded-xl bg-slate-200">
          <form
            action=""
            className="relative items-center flex flex-col justify-center w-full p-8"
          >
            <button
              className="absolute -top-4 -right-4 p-3 bg-white rounded-full"
              // @ts-ignore
              onClick={() => setIsModalOpen()}
            >
              <CgClose />
            </button>
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-500  text-xs font-bold mb-2">
                Song Name
              </label>
              <input
                className="appearance-none w-full bg-otherColor text-gray-500 border rounded py-3 px-4 mb-3 text-sm leading-tight focus:outline-none bsmmd:text-md"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter song Name"
              />
            </div>

            {/* Album */}
            <div className="w-full">
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
            <div className="w-full">
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
            <div className="w-full">
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
              Update Song
            </button>
          </form>
        </div>
      </div>
    )
  );
}

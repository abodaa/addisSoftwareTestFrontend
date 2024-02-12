import { RxAvatar } from "react-icons/rx";
import poster from "../assets/musicposterplaceholder.png";
import { MdOutlineAlbum } from "react-icons/md";
import { IoMdMusicalNote } from "react-icons/io";
import { useEffect, useState } from "react";
import { fetchSongs } from "../features/songsSlice";
import DeleteSongButton from "../components/DeleteSongButton";
import EditSongModal from "../components/EditSongModal";
import { BiEdit } from "react-icons/bi";

import { UseAppSelector, useAppDispatch } from "../state/hooks";

export default function SongCard() {
  const dispatch = useAppDispatch();
  const song = UseAppSelector((state) => state.songs);
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchSongs());
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);

  return (
    <div className="capitalize flex flex-col gap-5">
      {song.loading && <div>Loading ...</div>}
      {!song.loading && song.error && <div> {song.error} </div>}
      {!song.loading && song.songs.length
        ? song.songs.map((song) => {
            return (
              <div key={song._id}>
                <div className="relative p-5 bg-gray-300 flex items-center gap-4 rounded-xl">
                  <img
                    src={poster}
                    alt="musicposter"
                    className="w-32 rounded-full"
                  />
                  <div>
                    <div>
                      <p className="text-xl font-bold ">{song.title}</p>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700">
                      <MdOutlineAlbum />
                      <p className="text-md">{song.album}</p>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700">
                      <IoMdMusicalNote />
                      <p className="text-md">{song.genre}</p>
                    </div>
                    <div className="flex items-center gap-4 text-gray-700">
                      <RxAvatar />
                      <p className="text-md">{song.artist}</p>
                    </div>
                  </div>
                  <button className="absolute top-5 right-5">
                    <DeleteSongButton songId={song._id} />
                  </button>
                  <button
                    onClick={() => {
                      // @ts-ignore
                      setOpenModalId(song._id);
                      setIsModalOpen(true);
                    }}
                    className="absolute bottom-5 right-5 text-gray-600 text-xl bg-white p-2 rounded-full"
                  >
                    <BiEdit />
                  </button>
                  {openModalId === song._id && (
                    <EditSongModal
                      isModalOpen={isModalOpen}
                      // @ts-ignore
                      setIsModalOpen={() => setIsModalOpen(false)}
                      song={song}
                    />
                  )}
                </div>
              </div>
            );
          })
        : !song.loading && <div>No Songs Found!</div>}
    </div>
  );
}

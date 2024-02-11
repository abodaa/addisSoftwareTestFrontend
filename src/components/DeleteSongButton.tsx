import { useAppDispatch } from "../state/hooks";
import { deleteSong } from "../features/songsSlice";
import { BiTrash } from "react-icons/bi";
import { FormEvent } from "react";


function DeleteSongButton({ songId }) {
  const dispatch = useAppDispatch();

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteSong(songId)).catch((error) => {
      console.error("Error Deleting song:", error.message);
    });
  };

  return (
    <div
      className="text-gray-600 text-xl bg-white p-2 rounded-full"
      onClick={(e) => handleDelete(e)}
    >
      <BiTrash />
    </div>
  );
}

export default DeleteSongButton;

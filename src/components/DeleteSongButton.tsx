import React from "react";
import { useDispatch } from "react-redux";
import { deleteSong } from "../features/songsSlice";
import { TbRadioOff } from "react-icons/tb";
import { BiRecycle, BiTrash } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { CgTrashEmpty } from "react-icons/cg";

function DeleteSongButton({ songId }) {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSong(songId)).catch((error) => {
      console.error("Error Deleting song:", error.message);
    });
  };

  return <button className="text-gray-600 text-xl bg-white p-2 rounded-full" onClick={(e) => handleDelete(e)}><BiTrash/></button>;
}

export default DeleteSongButton;

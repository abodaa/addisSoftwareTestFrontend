// Component type aliases
import { BiSearch } from "react-icons/bi";
import logo from "../assets/musicposterplaceholder.png";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../state/hooks";
import { fetchSearchedSongs } from "../features/songsSlice";
export default function Header() {
  // Filter States
  const [searchByTitle, setSearchByTitle] = useState("");

  // Dispatch fetchSearchedSongs with search string
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSearchedSongs(searchByTitle));
  }, [searchByTitle]);

  return (
    <div className={`flex shadow-lg py-3 justify-around items-center`}>
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold">
        <img src={logo} alt="" className="w-10 rounded-full" />
        <p>Logo</p>
      </div>
      {/* Search Input */}
      <div className="relative w-1/2">
        <input
          type="text"
          name="search"
          value={searchByTitle}
          onChange={(e) => {
            setSearchByTitle(e.target.value);
          }}
          placeholder="Search song by title ... "
          className="bg-gray-200 rounded-full  w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <BiSearch className="absolute top-1/2 right-3 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Filter Button */}
      {/* <button className="bg-gray-300 px-6 py-2">Enjoy the songs</button> */}
    </div>
  );
}

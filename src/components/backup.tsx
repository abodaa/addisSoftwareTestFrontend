import { RootState } from "../state/store";
import { CgMusicSpeaker } from "react-icons/cg";
import { IoMdMusicalNote } from "react-icons/io";
import { MdOutlineAlbum } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

type Genre = {
  _id: string;
  count: number;
};

type Album = {
  _id: string;
  songsInAlbumCount: number;
};

type Artist = {
  _id: string;
  albumCount: number;
  songCount: number;
};

type StatsCardProps = {
  songs: number;
  albums: number;
  genres: number;
  artists: number;
  numberOfSongsInGenre: Genre[];
  numberOfSongsInAlbum: Album[];
  numberOfSongsandAlbumsInArtist: Artist[];
};

export default function StatsCard({
  songs,
  albums,
  genres,
  artists,
  numberOfSongsInGenre,
  numberOfSongsInAlbum,
  numberOfSongsandAlbumsInArtist,
}: StatsCardProps) {
  // STATE THING
  const songsStat = useSelector((state: RootState) => state.songsStat.value);
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-gray-300 p-6 rounded-xl">
      <h1 className="font-bold text-xl">Songs Stat</h1>
      {/* General Songs Stats */}
      <div className="grid grid-cols-4 gap-1 mt-5 items-center justify-between">
        {[
          { icon: CgMusicSpeaker, name: "songs", stat: songs },
          { icon: MdOutlineAlbum, name: "albums", stat: albums },
          { icon: IoMdMusicalNote, name: "genres", stat: genres },
          { icon: RxAvatar, name: "artists", stat: artists },
        ].map((stat) => {
          return (
            <div className="flex flex-col items-center gap-1 text-gray-700 bg-white p-7 rounded-lg capitalize">
              <stat.icon className=" text-3xl" />
              <p className="text-sm">{stat.name}</p>
              <p className="text-md font-bold">{stat.stat}</p>
            </div>
          );
        })}
      </div>

      {/* Specific Songs Stats */}
      <div className="grid grid-cols-3 text-center gap-2 mt-5 items-start justify-between">
        {/* Number of songs in each genre */}
        <div className="flex flex-col gap-1 text-gray-700 rounded-lg capitalize ">
          {numberOfSongsInGenre.map((genreSong) => {
            return (
              <div className="flex flex-col items-center gap-1 text-gray-700 bg-white p-2 rounded-lg capitalize">
                <p className="text-sm">{genreSong._id}</p>
                <p className="text-sm font-bold bg-gray-300 px-4 rounded">
                  {genreSong.count} songs
                </p>
              </div>
            );
          })}
        </div>
        {/* Number of songs in each album */}
        <div className="flex flex-col gap-1 text-gray-700 rounded-lg capitalize">
          {numberOfSongsInAlbum.map((albumSong) => {
            return (
              <div className="flex flex-col items-center text-center gap-1 text-gray-700 bg-white p-2 rounded-lg capitalize">
                <p className="text-sm">{albumSong._id}</p>
                <p className="text-sm font-bold bg-gray-300 px-4 rounded">
                  {albumSong.songsInAlbumCount} songs
                </p>
              </div>
            );
          })}
        </div>
        {/* Number of songs and album in each artis has */}
        <div className="flex flex-col gap-1 text-gray-700 rounded-lg capitalize">
          {numberOfSongsandAlbumsInArtist.map((artistSong) => {
            return (
              <div className="flex flex-col items-center gap-1 text-center text-gray-700 bg-white p-2 rounded-lg capitalize">
                <p className="text-sm ">{artistSong._id}</p>
                {/* <div className="flex gap-1"> */}
                <p className="text-sm font-bold bg-gray-300 px-4 rounded">
                  {artistSong.albumCount} album
                </p>
                <p className="text-sm font-bold bg-gray-300 px-4 rounded">
                  {artistSong.songCount} songs
                </p>
                {/* </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

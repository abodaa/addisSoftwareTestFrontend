import { CgMusicSpeaker } from "react-icons/cg";
import { IoMdMusicalNote } from "react-icons/io";
import { MdOutlineAlbum } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

import { useEffect } from "react";
import { UseAppSelector, useAppDispatch } from "../state/hooks";
import { fetchStat } from "../features/statSlice";

export default function StatsCard() {
  const dispatch = useAppDispatch();
  const stat = UseAppSelector((state) => state.stat);
  useEffect(() => {
    dispatch(fetchStat());
  }, []);


  return (
    <div className="w-full bg-gray-300 p-6 rounded-xl">
      <h1 className="font-bold text-xl">Songs Stat</h1>
      {/* General Songs Stats */}
      {stat.loading && <div>Loading ...</div>}
      {!stat.loading && stat.error && <div> {stat.error} </div>}
      {!stat.loading && stat.stat ? (
        <div className="grid grid-cols-4 gap-1 mt-5 items-center justify-between">
          {[
            {
              icon: CgMusicSpeaker,
              name: "songs",
              number: stat.stat.totalSongsCount,
            },
            {
              icon: MdOutlineAlbum,
              name: "albums",
              number: stat.stat.totalAlbumsCount,
            },
            {
              icon: IoMdMusicalNote,
              name: "genres",
              number: stat.stat.totalGenresCount,
            },
            {
              icon: RxAvatar,
              name: "artists",
              number: stat.stat.totalArtistsCount,
            },
          ].map((stat) => {
            return (
              <div key={stat.name} className="flex flex-col items-center gap-1 text-gray-700 bg-white p-7 rounded-lg capitalize">
                <stat.icon className=" text-3xl" />
                <p className="text-sm">{stat.name}</p>
                <p className="text-md font-bold">{stat.number}</p>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Specific Songs Stats */}
      <div className="grid grid-cols-3 gap-2 mt-5 items-start justify-between">
        {/* Number of songs in each genre */}

        {stat.stat.genreCounts && (
          <div className="flex flex-col gap-1 text-gray-700 rounded-lg capitalize ">
            <h3 className="font-bold">Genres</h3>

            {stat.stat.genreCounts.map((genreSong) => {
              return (
                <div key={genreSong._id} className="flex flex-col items-center gap-1 text-gray-700 bg-white p-2 rounded-lg capitalize">
                  <p className="text-sm">{genreSong._id}</p>
                  <p className="text-sm font-bold bg-gray-300 px-4 rounded">
                    {genreSong.count} songs
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {/* Number of songs in each album */}
        {stat.stat.eachAlbumSongsCounts && (
          <div className="flex flex-col gap-1 text-gray-700 rounded-lg capitalize">
            <h3 className="font-bold">Albums</h3>

            {stat.stat.eachAlbumSongsCounts.map((albumSong) => {
              return (
                <div key={albumSong._id} className="flex flex-col items-center text-center gap-1 text-gray-700 bg-white p-2 rounded-lg capitalize">
                  <p className="text-sm">{albumSong._id}</p>
                  <p className="text-sm font-bold bg-gray-300 px-4 rounded">
                    {albumSong.songsInAlbumCount} songs
                  </p>
                </div>
              );
            })}
          </div>
        )}
        {/* Number of songs and album in each artis has */}
        {stat.stat.artistAlbumaAndSongsCounts && (
          <div className="flex flex-col gap-1 text-gray-700 rounded-lg capitalize">
            <h3 className="font-bold">Artists</h3>
            {stat.stat.artistAlbumaAndSongsCounts.map((artistSong) => {
              return (
                <div key={artistSong._id} className="flex flex-col items-center gap-1 text-center text-gray-700 bg-white p-2 rounded-lg capitalize">
                  <p className="text-sm ">{artistSong._id}</p>
                  <p className="text-sm font-bold bg-gray-300 px-4 rounded">
                    {artistSong.albumCount} album
                  </p>
                  <p className="text-sm font-bold bg-gray-300 px-4 rounded">
                    {artistSong.songCount} songs
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import Header from "../components/Header";
import AddSongCard from "../components/AddSongCard";
import StatsCard from "../components/StatsCard";
import SongCard from "../components/SongCard";

export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="container m-auto grid grid-cols-3 place-content-center items-start mt-10 gap-5">
        <AddSongCard />
        <SongCard />
        <StatsCard />
      </div>
    </div>
  );
}

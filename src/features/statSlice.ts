import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Ts types
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

// GENERAL RETURNED STAT TYPES
type Stat = {
  totalAlbumsCount: number,
  totalArtistsCount: number,
  totalGenresCount: number,
  totalSongsCount: number,
  genreCounts: Genre[],
  artistAlbumaAndSongsCounts: Album[],
  eachAlbumSongsCounts: Artist[],
};

type InitialState = {
  loading: boolean;
  stat: Stat[];
  error: string;
};

// Initial State
const initialState: InitialState = {
  loading: false,
  stat: [],
  error: "",
};

export const fetchStat = createAsyncThunk("stat/fetchStat", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/songs/stat");
  return response.data.data;
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchStat.fulfilled,
      (state, action: PayloadAction<Stat[]>) => {
        state.loading = false;
        state.stat = action.payload;
        state.error = "";
      }
    );

    builder.addCase(fetchStat.rejected, (state, action) => {
      state.loading = false;
      state.stat = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default statSlice.reducer;

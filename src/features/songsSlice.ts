import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Ts types
export type Songs = {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
};

type InitialState = {
  loading: boolean;
  songs: Songs[];
  error: string;
};

// Initial State
const initialState: InitialState = {
  loading: false,
  songs: [],
  error: "",
};
// Fetch Songs
export const fetchSongs = createAsyncThunk("songs/fetchSongs", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/songs");
  return response.data.data;
});

// Create Songs
export const createSong = createAsyncThunk(
  "songs/createSong",
  async (newSongData) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/songs",
      newSongData
    );
    return response.data.data;
  }
);

// Edit Songs
export const editSong = createAsyncThunk(
  "songs/editSong",
  async (editedSongData) => {
    const response = await axios.patch(
      `http://localhost:3000/api/v1/songs/${editedSongData.songId}`,
      editedSongData
    );
    return response.data.data;
  }
);

// Delete Song
export const deleteSong = createAsyncThunk(
  "songs/deleteSong",
  async (songId) => {
    await axios.delete(`http://localhost:3000/api/v1/songs/${songId}`);
    return songId;
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Songs
    builder.addCase(fetchSongs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchSongs.fulfilled,
      (state, action: PayloadAction<Songs[]>) => {
        state.loading = false;
        state.songs = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchSongs.rejected, (state, action) => {
      (state.loading = false),
        (state.songs = []),
        (state.error = action.error.message || "Something went wrong");
    });

    // Create Song
    builder.addCase(createSong.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSong.fulfilled, (state, action) => {
      state.loading = false;
      state.songs.unshift(action.payload);
      state.error = "";
    });
    builder.addCase(createSong.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wreong";
    });

    // Edit Song
    builder.addCase(editSong.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editSong.fulfilled, (state, action) => {
      state.loading = false;
      const updatedSongIndex = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      state.songs[updatedSongIndex] = action.payload;
      state.error = "";
    });
    builder.addCase(editSong.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // Delete Song
    builder.addCase(deleteSong.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSong.fulfilled, (state, action) => {
      state.loading = false;
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.error = "";
    });
    builder.addCase(deleteSong.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default songsSlice.reducer;


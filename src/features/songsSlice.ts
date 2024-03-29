import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
const BASE_URL = import.meta.env.VITE_REACT_API_URL;
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

interface FetchOptions {
  filterByAlbum?: string;
  filterByArtist?: string;
  filterByGenre?: string;
}

interface EditedSongData {
  songId: string;
  updatedFields: Partial<Songs>; // Only include the fields that can be updated
}

// Initial State
const initialState: InitialState = {
  loading: false,
  songs: [],
  error: "",
};
// Fetch Songs
export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async ({ filterByAlbum, filterByArtist, filterByGenre }: FetchOptions) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/songs?album=${filterByAlbum}&artist=${filterByArtist}&genre=${filterByGenre}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Fetch Songs for searching
export const fetchSearchedSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (searchByTitle) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/songs?title=${searchByTitle}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Create Songs
export const createSong = createAsyncThunk(
  "songs/createSong",
  async (newSongData) => {
    const response = await axios.post(`${BASE_URL}/api/v1/songs`, newSongData);
    return response.data.data;
  }
);

// Edit Songs
export const editSong = createAsyncThunk(
  "songs/editSong",
  async (editedSongData: EditedSongData) => {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/songs/${editedSongData.songId}`,
      editedSongData
    );
    return response.data.data;
  }
);

// Delete Song
export const deleteSong = createAsyncThunk(
  "songs/deleteSong",
  async (songId) => {
    await axios.delete(`${BASE_URL}/api/v1/songs/${songId}`);
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
      state.error = "";
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

    // @ts-ignore
    builder.addCase(
      deleteSong.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.songs = state.songs.filter((song) => song._id !== action.payload);
        state.error = "";
      }
    );
    builder.addCase(deleteSong.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default songsSlice.reducer;

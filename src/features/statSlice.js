import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  stat: [],
  error: "",
};

export const fetchStat = createAsyncThunk("stat/fetchStat", () => {
  return axios
    .get("http://localhost:3000/api/v1/songs/stat")
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    });
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStat.fulfilled, (state, action) => {
      state.loading = false;
      state.stat = action.payload;
      state.error = "";
    });

    builder.addCase(fetchStat.rejected, (state, action) => {
      (state.loading = false),
        (state.stat = []),
        (state.error = action.error.message);
    });
  },
});

export default statSlice.reducer;

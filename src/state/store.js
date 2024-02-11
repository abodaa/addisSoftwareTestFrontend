import { configureStore } from "@reduxjs/toolkit";
import statReducer from "../features/statSlice";
import songsReducer from "../features/songsSlice";

const store = configureStore({
  reducer: {
    stat: statReducer,
    songs: songsReducer,
  },
});

export default store;

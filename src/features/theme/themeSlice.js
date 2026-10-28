import { createSlice } from "@reduxjs/toolkit";
import { getInitialTheme } from "./themeStorage";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: getInitialTheme() },
  reducers: {
    setTheme: (state, { payload }) => { state.mode = payload; },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

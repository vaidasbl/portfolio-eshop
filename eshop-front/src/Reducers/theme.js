import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    theme: "DEFAULT",
  },
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    set(theme, action) {
      theme.value = {
        theme: action.payload.theme,
      };
    },
    unset(theme) {
      theme.value = initialState.value;
    },
  },
});
export const { set, unset } = themeSlice.actions;
export default themeSlice.reducer;

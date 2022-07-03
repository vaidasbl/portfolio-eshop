import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    active: false,
    type: "success",
    text: "",
    time: 0,
  },
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,

  reducers: {
    alert(state, action) {
      state.value = {
        active: true,
        type: action.payload.type,
        text: action.payload.text,
        time: action.payload.time,
      };
    },

    alertOff(state, action) {
      state.value = {
        active: false,
        type: action.payload.type,
        text: action.payload.text,
        time: action.payload.time,
      };
    },
  },
});
export const { alert, alertOff } = alertSlice.actions;
export default alertSlice.reducer;

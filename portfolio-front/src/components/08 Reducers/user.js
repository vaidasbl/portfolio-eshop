import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: {
    isAuthenticated: false,
    username: "",
    _id: "",
    role: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login(user, action) {
      user.value = {
        isAuthenticated: true,
        username: action.payload.username,
        _id: action.payload._id,
        role: action.payload.role,
      };
    },
    logout(user) {
      user.value = initialState.value;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

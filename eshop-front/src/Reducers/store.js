import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import alertReducer from "./alert";
import themeReducer from "./theme";

const store = configureStore({
  reducer: { user: userReducer, alert: alertReducer, theme: themeReducer },
});

export default store;

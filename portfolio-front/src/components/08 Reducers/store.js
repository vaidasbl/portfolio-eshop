import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import alertReducer from "./alert";

const store = configureStore({
  reducer: { user: userReducer, alert: alertReducer },
});

export default store;

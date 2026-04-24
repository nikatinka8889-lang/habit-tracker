import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "../slices/habitsSlice";
import authReducer from "../slices/authSlice";
import dailyProgressReducer from "../slices/dailyProgressSlice";
export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    auth: authReducer,
    dailyProgress: dailyProgressReducer,
  },
});

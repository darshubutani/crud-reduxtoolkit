// store.ts
import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../redux/userDetailSlice";

export const store = configureStore({
  reducer: {
    userDetail: userDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

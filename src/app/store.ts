import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../redux/userDetailSlice";
import groupDetailReducer from "../redux/groupDetailSlice";
import { UserDetailState } from "../redux/userDetailSlice";
import { GroupDetailState } from "../redux/groupDetailSlice";

const rootReducer = {
  userDetail: userDetailReducer,
  groupDetail: groupDetailReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = {
  userDetail: UserDetailState;
  groupDetail: GroupDetailState;
};
export type AppDispatch = typeof store.dispatch;

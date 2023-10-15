import { configureStore } from "@reduxjs/toolkit";
import websitesReducer from "./slices/websitesSlice";

export const store = configureStore({
  reducer: {
    websites: websitesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

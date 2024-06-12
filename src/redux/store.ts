import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import ownedPlantSlice from "./ownedPlantSlice";

export const store = configureStore({
  reducer: { auth: authSlice, ownedPlant: ownedPlantSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

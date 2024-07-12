import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPlant } from "../types/plants";

type TIdentifyState = {
  image: Blob | null;
  recognizedPlant: TPlant | null;
};

const initialState: TIdentifyState = {
  image: null,
  recognizedPlant: null,
};

const identifySlice = createSlice({
  name: "identify",
  initialState,
  reducers: {},
});

export const {} = identifySlice.actions;

export default identifySlice.reducer;

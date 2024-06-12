import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  token: string | undefined;
  name: string | undefined;
  id: number | undefined;
}

export interface ILoginInfo {
  accessToken: string;
  name: string;
  id: number;
}

const initialState: IAuthState = {
  token: undefined,
  name: undefined,
  id: undefined,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginInfo>) => {
      state.token = action.payload.accessToken;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.token = undefined;
      state.name = undefined;
      state.id = undefined;
    },
  },
});

export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;

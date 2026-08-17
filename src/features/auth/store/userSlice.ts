import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/shared/types/user";

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    id: "",
    token: "",
    email: "",
    createdAt: "",
    isLogin: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addInfoLoginAction: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload, isLogin: true };
    },
    updateProfileAction: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    logoutUserAction: (state) => {
      state.user = { ...initialState.user };
    },
  },
});

export const { addInfoLoginAction, updateProfileAction, logoutUserAction } =
  userSlice.actions;
export default userSlice.reducer;

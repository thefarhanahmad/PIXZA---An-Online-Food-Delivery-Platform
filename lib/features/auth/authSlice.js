import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:
    typeof window !== "undefined" && localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
        state.token = action.payload;
      }
    },
    removeToken(state, action) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      state.token = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state, action) {
      state.user = null;
    },
  },
});

export const { setToken, removeToken, setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;

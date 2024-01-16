import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import login from "../services/login";
import { notifyFor } from "./notificationReducer";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

// receives user object which should contain {id, token, username}
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await login(credentials);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      // for state persistence in browser
      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      dispatch(notifyFor("Wrong Credentials!"));
    }
  };
};

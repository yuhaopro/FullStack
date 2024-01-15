import { createSlice } from "@reduxjs/toolkit";

// initial notification state
const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },

    reset(state, action) {
      return null;
    },
  },
});

export const { set, reset } = notificationSlice.actions;

export default notificationSlice.reducer;

export const notifyFor = (content, timeout = 5000) => {
  return (dispatch) => {
    // set notification, and clear it based on time given
    dispatch(set(content));
    setTimeout(() => {
      dispatch(reset());
    }, timeout);
  };
};

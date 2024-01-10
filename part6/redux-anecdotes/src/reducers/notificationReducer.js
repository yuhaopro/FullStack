import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload + " has been created";
    },
    notificationReset(state, action) {
        return null;
    }
  },
});

export const { notificationChange, notificationReset } = notificationSlice.actions;
export default notificationSlice.reducer;

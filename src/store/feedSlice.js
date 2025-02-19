import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "post",
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: (state, action) => action.payload,
  },
});

export const {addUser, removeUser} = feedSlice.actions
export default feedSlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
  },
});

export default store;

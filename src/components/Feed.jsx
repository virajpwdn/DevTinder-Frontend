import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/feedSlice";
import store from "../store/appStore";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));  // Correct action
      console.log(res.data);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (!feed?.length) {
      getFeed();
    }
  }, [feed]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!feed?.length) return <p>Loading...</p>;

  return feed.length >= 3 ? (
    <div><UserCard user={feed[2]} /></div>
  ) : (
    <p>Not enough data</p>
  );
};

export default Feed;

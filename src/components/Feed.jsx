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

      dispatch(addUser(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  console.log(feed);
  useEffect(() => {
    getFeed();
  }, []);
  if (!feed?.message?.length) return <p>Loading...</p>;

  return <div><UserCard user={feed.message[8]} /></div>;
};

export default Feed;

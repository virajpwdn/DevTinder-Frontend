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

      // TODO: add toster which has message like: your request is sent and it should have setTimeout

      dispatch(addUser(res.data));
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
  // if (!feed?.length) return <p>Loading...</p>;

  if (!feed) return;
  if (feed.length <= 0)
    return <p>Feed Page is empty, try again after sometime</p>;

  return (
    feed && (
      <div>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

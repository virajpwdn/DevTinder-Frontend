import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../store/feedSlice";
import store from "../store/appStore";
import UserCard from "./UserCard";
import Shimmer from "./Shimmer";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      // TODO: add toster which has message like: your request is sent and it should have setTimeout

      dispatch(addUser(res.data));
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!feed?.length) {
      getFeed();
    }
  }, []);

  if (isLoading) return <Shimmer />;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!feed || feed.length === 0) {
    return <p className="text-center text-gray-500">No more users to show</p>;
  }

  return (
    feed && (
      <div className="min-h-screen flex items-center justify-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

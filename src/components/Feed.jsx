import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser,removeUser} from "../store/feedSlice"

const Feed = () => {
  const [error, setError] = useState("")
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
  useEffect(()=>{
    getFeed()
  }, [])
  return <div>Feed</div>;
};

export default Feed;

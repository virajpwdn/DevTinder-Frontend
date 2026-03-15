import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/feedSlice";
import UserCard from "./UserCard";
import Shimmer from "./Shimmer";
import { useNavigate } from "react-router";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const formData = {
    firstName: feed[0]?.firstName ?? "",
    lastName: feed[0]?.lastName ?? "",
    gender: feed[0]?.gender ?? "",
    age: feed[0].age ?? "",
    bio: feed[0]?.bio ?? "",
    skills: feed[0]?.skills ?? "",
    photo: feed[0]?.photo ?? "",
    _id: feed[0]?._id,
  };
  const onClickHandler = () => {
    const params = new URLSearchParams(formData);
    navigate(`/guest?${params.toString()}`);
  };
  return (
    feed && (
      <div
        className="min-h-screen flex items-center justify-center cursor-pointer"
        onClick={() => {}}
      >
        <UserCard formData={formData} onClickHandler={onClickHandler} />
      </div>
    )
  );
};

export default Feed;

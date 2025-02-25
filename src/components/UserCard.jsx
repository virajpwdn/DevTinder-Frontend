import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, photo, lastName, age, gender, bio } = user;
  const dispatch = useDispatch();

  const buttonHandler = async (status, userId) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUser(userId));
      console.log(response.data);
    } catch (error) {
      // TODO: store error into state
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={photo || "/default-avatar.png"} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName || "Firstname"} ${
            lastName || "LastName"
          }`}</h2>
          <div className="flex gap-10">
            {age && <h2>{"Age: " + age}</h2>}
            {gender && <h2>{"Gender: " + gender}</h2>}
          </div>
          <p>{bio || "bio"}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => buttonHandler("ignored", _id)}
            >
              Ignored
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => buttonHandler("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

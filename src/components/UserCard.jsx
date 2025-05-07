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
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="card bg-base-300 w-full max-w-sm shadow-xl">
        <figure className="p-4">
          <img
            src={photo || "/default-avatar.png"}
            alt="photo"
            className="rounded-lg object-cover w-full h-64"
          />
        </figure>
        <div className="card-body flex flex-col items-center text-center">
          <h2 className="card-title text-lg md:text-xl">
            {`${firstName || "Firstname"} ${lastName || "LastName"}`}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base mt-2">
            {age && <span>Age: {age}</span>}
            {gender && <span>Gender: {gender}</span>}
          </div>
          <p className="mt-2">{bio || "bio"}</p>
          <div className="card-actions justify-center mt-4 flex-wrap gap-2">
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

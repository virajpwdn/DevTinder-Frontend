import React from "react";

const UserCard = ({user}) => {
    const {firstName, photo, lastname, age, gender, bio} = user
    // console.log(bio);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card bg-base-300 w-96 shadow-xl p-2">
        <figure>
          <img
            src={photo || "photo"}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName || "Firstname"} ${lastname || "LastName"}`}</h2>
          <p>{bio || "bio"}</p>
          <div className="card-actions justify-center pt-3">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

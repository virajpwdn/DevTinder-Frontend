import React from "react";

const UserCard = ({ user }) => {
  const { firstName, photo, lastName, age, gender, bio } = user;
  // console.log(bio);
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

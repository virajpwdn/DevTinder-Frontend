import React from "react";

const UserCard = ({user}) => {
    const {firstName, photo, lastname, age, gender} = user
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={photo}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName}!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

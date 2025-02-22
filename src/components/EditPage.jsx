import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { data, useNavigate } from "react-router";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/UserCard";
import Toast from "./Toast";

const EditPage = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [photo, setPhoto] = useState(user?.photo || "");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const ageAsNumber = age ? parseInt(age, 10) : null;
      const respnose = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          bio,
          age: ageAsNumber,
          photo,
          skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(respnose.data?.data));
      // {
      //   <Toast message={respnose.data.message} />;
      // }
      console.log(respnose);
    } catch (error) {
      console.error(
        "Full Error Response:",
        error.response?.message || error.message
      );
      setError(error?.response?.message || "something went wrong");
    }
  };
  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center justify-center hero bg-base-200 min-h-screen w-[50%]">
          <div className="hero-content flex-col lg:flex-row-reverse ">
            <div className="card bg-base-100 w-80 max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={submitHandler}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs">FIRSTNAME</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs">LASTNAME</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs uppercase">Gender</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Gender"
                    className="input input-bordered"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs uppercase">Bio</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bio"
                    className="input input-bordered"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs uppercase">Age</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Age"
                    className="input input-bordered"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs uppercase">Photo</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Photo"
                    className="input input-bordered"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs uppercase">Skills</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Skills"
                    className="input input-bordered"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                <p className="text-red-500 text-xs">{error}</p>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">update profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, photo, lastName, age, gender, bio }} />
        <div className="toast toast-center">
          <div className="alert alert-info">
            <span>New mail arrived.</span>
          </div>
          <div className="alert alert-success">
            <span>hey</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPage;

import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";

const EditPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [photo, setPhoto] = useState("");
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

      console.log(respnose);
    } catch (error) {
      console.error(
        "Full Error Response:",
        error.response?.data || error.message
      );
      setError(error?.response?.data || "something went wrong");
    }
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen py-8">
        <div className="hero-content flex-col lg:flex-row-reverse">
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
    </div>
  );
};

export default EditPage;

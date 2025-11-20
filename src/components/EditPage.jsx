import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { data, useNavigate } from "react-router";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/UserCard";
import { truncateText } from "../utils/truncateText";

const EditPage = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [photo, setPhoto] = useState(user?.photo || "");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [showToast, setShowToast] = useState(false);

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
      setError("");
      setShowToast(true);
      setResponse(respnose.data.message);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      console.log(respnose);
      navigate("/feed");
    } catch (error) {
      console.error(
        "Full Error Response:",
        error?.response?.data || error.message
      );
      setError(error?.response?.data || "something went wrong");
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center lg:flex-row justify-center gap-10 my-10 px-4">
        {/* Left: Form Container */}
        <div className="w-full max-w-[500px] bg-base-200 rounded-lg flex items-center justify-center">
          <div className="w-full px-6 py-4 overflow-y-auto">
            <form className="card-body" onSubmit={submitHandler}>
              {[
                {
                  label: "First Name",
                  value: firstName,
                  setValue: setFirstName,
                },
                { label: "Last Name", value: lastName, setValue: setLastName },
                { label: "Gender", value: gender, setValue: setGender },
                { label: "Bio", value: bio, setValue: setBio },
                { label: "Age", value: age, setValue: setAge },
                { label: "Photo", value: photo, setValue: setPhoto },
                { label: "Skills", value: skills, setValue: setSkills },
              ].map((field, idx) => (
                <div className="form-control" key={idx}>
                  <label className="label">
                    <span className="label-text text-xs uppercase">
                      {field.label}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder={field.label}
                    className="input input-bordered"
                    value={field.value}
                    onChange={(e) => field.setValue(truncateText(e.target.value))}
                  />
                </div>
              ))}
              <p className="text-red-500 text-xs">{error}</p>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Update Profile</button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: User Card Container */}
        <div className="w-full h-[792px] max-w-[500px] bg-base-200 rounded-lg flex items-center justify-center px-6 py-4">
          <UserCard user={{ firstName, photo, lastName, age, gender, bio }} />
        </div>

        {/* Toast Notification */}
        {showToast && response && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>{response}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditPage;

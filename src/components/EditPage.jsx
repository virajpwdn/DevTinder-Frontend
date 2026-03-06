import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/UserCard";
import { truncateText } from "../utils/truncateText";
import PropTypes from "prop-types";
import { RiUpload2Fill } from "@remixicon/react";
import imgHeicToJpegConvert from "../utils/heicConvert";

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
  const [isPhotoUpload, setIsPhotoUpload] = useState(false);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [images, setImages] = useState([]);

  const fileInputRef = useRef();

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
        { withCredentials: true },
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
        error?.response?.data || error.message,
      );
      setError(error?.response?.data || "something went wrong");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = Array.from(e.dataTransfer.files);
    handleFiles(droppedFile);
  };

  const handleFiles = async (selectedFile) => {
    console.log("selected file ", selectedFile);
    if (!selectedFile) return;
    if (selectedFile.length > 6 || images.length > 5)
      return alert("You can only upload upto 6 images");

    const imageFiles = await imgHeicToJpegConvert(selectedFile);

    setImages((prev) => {
      return [...prev, ...imageFiles];
    });

    setFile(selectedFile);
    setPreview(imageFiles);
    console.log("selected file url", imageFiles);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center lg:flex-row justify-center gap-10 my-10 px-4">
        {/* Left: Form Container */}
        <div
          className="w-full max-w-[500px]"
          style={{
            transition: "transform 0.6s ease",
            transform: isPhotoUpload ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
            position: "relative",
            minHeight: "600px",
          }}
        >
          <div
            className="bg-base-200 rounded-lg flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full px-6 py-4 overflow-y-auto">
              <form className="card-body" onSubmit={submitHandler}>
                {[
                  {
                    label: "First Name",
                    value: firstName,
                    setValue: setFirstName,
                  },
                  {
                    label: "Last Name",
                    value: lastName,
                    setValue: setLastName,
                  },
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
                      onChange={(e) =>
                        field.setValue(truncateText(e.target.value))
                      }
                    />
                  </div>
                ))}
                <p className="text-red-500 text-xs">{error}</p>
                <div className="form-control mt-6 flex gap-3 flex-row">
                  <button className="btn btn-primary flex-1">
                    Update Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPhotoUpload((prev) => !prev);
                    }}
                    className="btn btn-outline flex-1"
                  >
                    Upload Photos
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className="bg-base-200 rounded-lg w-full absolute inset-0 p-14"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex gap-3 items-center">
              {/* your upload UI goes here */}
              <button
                type="button"
                onClick={() => setIsPhotoUpload(false)}
                className="btn rounded-full btn-outline btn-sm"
              >
                ←
              </button>
              <h2 className="text-lg font-bold">Upload Photo</h2>
            </div>

            {/* upload photos */}
            <div className="h-[480px] w-full border border-dotted border-gray-400 rounded-xl mt-16 flex flex-col gap-2  items-center justify-center p-4">
              <div
                className={`w-full h-20 border rounded-xl border-dotted border-gray-600 flex items-center justify-center gap-3 ${dragOver ? "bg-base-300 border-primary" : "bg-base-200"} cursor-pointer transition-colors duration-200`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <RiUpload2Fill className="cursor-pointer" />
                <form action="">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={(e) => {
                      console.log("Event ", e);
                      handleFiles(Array.from(e.target.files));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="btn btn-primary btn-sm text-white"
                  >
                    file upload
                  </button>
                </form>
              </div>
              <p className="text-xs">Drag or Click on the file below</p>
              <p className="text-xs leading-none -mt-1">
                You can only upload upto 6 photos
              </p>
            </div>
          </div>
        </div>

        {/* Right: User Card Container */}
        <div className="w-full h-[792px] max-w-[500px] bg-base-200 rounded-lg flex items-center justify-center px-6 py-4">
          <UserCard
            user={{ firstName, photo, lastName, age, gender, bio }}
            isPhotoUpload={isPhotoUpload}
            images={images}
            setImages={setImages}
          />
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

EditPage.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bio: PropTypes.string,
    skills: PropTypes.array,
    photo: PropTypes.string,
  }),
};

export default EditPage;

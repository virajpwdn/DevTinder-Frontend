import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "../components/UserCard";
import { truncateText } from "../utils/truncateText";
import PropTypes from "prop-types";
import {
  RiGithubLine,
  RiGlobalLine,
  RiInstagramLine,
  RiTwitterLine,
  RiUpload2Fill,
} from "@remixicon/react";
import imgHeicToJpegConvert from "../utils/heicConvert";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import AuthService from "../service/auth.service";
import UserService from "../service/user.service";

const EditPage = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.gender || "",
    age: user?.age || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    photo: user?.photo || "",
  });

  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isPhotoUpload, setIsPhotoUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [images, setImages] = useState([]);
  const [imgMetadata, setImgMetadata] = useState([]);
  const [showSocial, setShowSocial] = useState(false);

  const fileInputRef = useRef();
  const abortControllerRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const ageAsNumber = formData.age ? parseInt(formData.age, 10) : null;
      const respnose = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          bio: formData.bio,
          age: ageAsNumber,
          photo: formData.photo,
          skills: formData.skills,
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
    if (!selectedFile) return;
    if (selectedFile.length + images.length > 6)
      return alert("You can only upload upto 6 images");

    const imageFiles = await imgHeicToJpegConvert(selectedFile);
    setImages((prev) => [...prev, ...imageFiles]);

    abortControllerRef.current = new AbortController();

    try {
      const uploadImagesPromise = imageFiles.map(async (file) => {
        const authParams = await AuthService.getImageKitToken();

        try {
          const result = await upload({
            ...authParams,
            file: file.file,
            fileName: file.file.name,
            onProgress: (event) => {
              const percent = Math.round((event.loaded / event.total) * 100);

              setImages((prev) =>
                prev.map((img) => {
                  return img?.clientRefId === file?.file?.clientRefId
                    ? { ...img, progress: percent }
                    : img;
                }),
              );
            },
            abortSignal: abortControllerRef.current.signal,
          });

          return {
            status: "fulfilled",
            fileName: file.file.name,
            clientRefId: file.file.clientRefId,
            value: result,
          };
        } catch (error) {
          return {
            status: "rejected",
            fileName: file.file.name,
            reason: error,
          };
        }
      });

      const results = await Promise.all(uploadImagesPromise);
      console.log("RESULTS ", results);
      const succeed = results.filter((r) => r.status === "fulfilled");
      const failed = results.filter((r) => r.status === "rejected");

      setImages((prev) =>
        prev.map((img) => {
          console.log("IMG - ", img);
          console.log("PREVIOUS - ", prev);
          console.log("suc - ", succeed);
          const match = succeed.find((r) => r.clientRefId === img.clientRefId);
          if (match) {
            return {
              ...img,
              status: "complete",
              imagekitResponse: match.value,
            };
          }
          return img;
        }),
      );

      const newMetadata = succeed.map((img) => ({
        filePath: img.value.filePath,
        fileId: img.value.fileId,
        fileType: img.value.fileType,
        height: img.value.height,
        width: img.value.width,
        url: img.value.url,
        size: img.value.size,
        clientRefId: img.clientRefId,
      }));

      if (failed.length > 0) {
        const failedFileNames = new Set(failed.map((r) => r.fileName));
        alert(
          `${failed.length} image(s) failed to upload, ${failed[0].reason}`,
        );

        setImages((prev) =>
          prev.filter((img) => !failedFileNames.has(img.name)),
        );
      }

      if (succeed.length > 0) {
        await UserService.postUserPhotos(newMetadata);
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Failed to authenticate for upload:", error);
      }
      return;
    }
  };

  const imgDeleteHandler = async (photoId) => {
    const deleteImg = await UserService.deletePhotoById(photoId);
    setImages(deleteImg.photos);
  };

  useEffect(() => {
    const getAllPhotos = async () => {
      try {
        const { data } = await UserService.getAllPhotos();
        if (data.photos.length > 0) {
          setImages(data.photos);
        }
      } catch (error) {
        console.log("error - ", error);
      }
    };

    getAllPhotos();
  }, []);

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
          {/* Front side card */}
          <div
            className="bg-base-200 rounded-lg flex items-center justify-center"
            style={{ backfaceVisibility: "hidden", overflow: "hidden" }}
          >
            <div
              className="w-full px-6 py-4"
              style={{
                transition:
                  "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
                transform: showSocial ? "translateY(-100%)" : "translateY(0%)",
                opacity: showSocial ? 0 : 1,
              }}
            >
              <form className="card-body" onSubmit={submitHandler}>
                {[
                  {
                    label: "First Name",
                    value: formData.firstName,
                    name: "firstName",
                  },
                  {
                    label: "Last Name",
                    value: formData.lastName,
                    name: "lastName",
                  },
                  {
                    label: "Gender",
                    value: formData.gender,
                    name: "gender",
                  },
                  { label: "Bio", value: formData.bio, name: "bio" },
                  { label: "Age", value: formData.age, name: "age" },
                  { label: "Photo", value: formData.photo, name: "photo" },
                  {
                    label: "Skills",
                    value: formData.skills,
                    name: "skills",
                  },
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
                        setFormData({
                          ...formData,
                          [field.name]: truncateText(e.target.value),
                        })
                      }
                    />
                  </div>
                ))}
                <p className="text-red-500 text-xs">{error}</p>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Update Profile</button>
                </div>
                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsPhotoUpload((prev) => !prev);
                    }}
                    className="btn btn-outline flex-1"
                  >
                    Upload Photos
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSocial(true)}
                    className="btn btn-outline flex-1"
                  >
                    Add Social Links
                  </button>
                </div>
              </form>
            </div>
            {/* social div */}
            <div
              className="bg-base-200 rounded-lg w-full absolute inset-0 p-10"
              style={{
                transition:
                  "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
                transform: showSocial ? "translateY(0%)" : "translateY(100%)",
                opacity: showSocial ? 1 : 0,
                pointerEvents: showSocial ? "auto" : "none",
              }}
            >
              <div className="flex gap-3 items-center">
                {/* your upload UI goes here */}
                <button
                  type="button"
                  onClick={() => setShowSocial(false)}
                  className="btn rounded-full btn-outline btn-sm"
                >
                  ←
                </button>
                <h2 className="text-lg font-bold">Add Social Links</h2>
              </div>

              {/* Form For social fields */}
              <form className="card-body mt-12">
                {[
                  {
                    label: "GtiHub",
                    value: formData.firstName,
                    name: "gitHub",
                    icon: RiGithubLine,
                  },
                  {
                    label: "Twitter",
                    value: formData.lastName,
                    name: "twitter",
                    icon: RiTwitterLine,
                  },
                  {
                    label: "Instagram",
                    value: formData.gender,
                    name: "instagram",
                    icon: RiInstagramLine,
                  },
                  {
                    label: "Website",
                    value: formData.bio,
                    name: "website",
                    icon: RiGlobalLine,
                  },
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
                        setFormData({
                          ...formData,
                          [field.name]: truncateText(e.target.value),
                        })
                      }
                    />
                  </div>
                ))}
                <p className="text-red-500 text-xs">{error}</p>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Update Social Links</button>
                </div>
              </form>
            </div>
          </div>
          {/* Back side card */}
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
        <div className="w-full h-[850px] max-w-[500px] bg-base-200 rounded-lg flex items-center justify-center px-6 py-4">
          <UserCard
            formData={formData}
            isPhotoUpload={isPhotoUpload}
            images={images}
            setImages={setImages}
            imgDeleteHandler={imgDeleteHandler}
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

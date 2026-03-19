import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/feedSlice";
import PropTypes from "prop-types";
import {
  RiDeleteBin6Line,
  RiGithubLine,
  RiGlobeLine,
  RiInstagramLine,
  RiTwitterLine,
} from "@remixicon/react";

const UserCard = ({
  formData,
  isPhotoUpload = false,
  images,
  imgDeleteHandler,
  onClickHandler,
}) => {
  const dispatch = useDispatch();

  const buttonHandler = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );

      dispatch(removeUser(userId));
    } catch (error) {
      // TODO: store error into state
      console.log(error);
    }
  };

  return (
    <div className="h-[768px] w-full flex items-center justify-center px-4 py-8">
      {/* Wrapper — this is what rotates */}
      <div
        className="w-full max-w-sm"
        style={{
          transition: "transform 0.6s ease",
          transform: isPhotoUpload ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          position: "relative",
          height: "500px",
        }}
      >
        {/* FRONT FACE */}
        <div
          className="card w-full absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
          onClick={onClickHandler}
        >
          <div className="w-[400px] mx-auto rounded-lg bg-black/25 shadow-xl flex gap-4 p-3 py-10 flex-col md:flex-row">
            <div className="flex-1 pl-5 pr-2 relative">
              <div id="cover-photo" className="rounded-md -ml-3 z-0 relative">
                <img
                  className="rounded-lg h-40 w-full object-cover"
                  src={
                    formData.coverPhoto ||
                    "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="cover photo"
                />
                <div className="flex absolute bottom-3 right-3 text-white gap-2">
                  <a
                    onClick={(e) => e.stopPropagation()}
                    href={formData?.socialLinks?.gitHub}
                  >
                    <RiGithubLine />
                  </a>
                  <RiGlobeLine />
                  <RiInstagramLine />
                  <RiTwitterLine />
                </div>
              </div>
              <div className="-mt-14 w-full relative z-50">
                <div id="img-container" className="h-24 w-24 rounded-lg z-10">
                  <img
                    src={formData.photo}
                    alt=""
                    className="size-full rounded-md object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mt-2">
                  {formData.firstName + " " + formData.lastName}
                </h3>
                <p className="text-sm font-light">{formData.bio}</p>
                <p className="mt-5 font-bold">Skills </p>
                <p className="py-2 flex flex-wrap gap-3">
                  {formData?.skills?.map((skill, idx) => (
                    <span
                      className="border border-dotted p-1 rounded-md"
                      key={idx}
                    >
                      {skill}
                    </span>
                  ))}
                </p>
                <div className="flex gap-4">
                  <p>Age: {formData.age ? formData.age : "N/A"}</p>
                  <p>Gender: {formData.gender}</p>
                </div>

                <div className="flex gap-2 w-full mt-5 -ml-1">
                  <button
                    className="flex-1 btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      buttonHandler("ignored", formData?._id);
                    }}
                  >
                    Ignored
                  </button>
                  <button
                    className="flex-1 btn btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      buttonHandler("interested", formData?._id);
                    }}
                  >
                    Interested
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="card bg-base-300 w-full p-5 shadow-xl absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-32 w-full rounded-md grid col-span-2 grid-cols-2 justify-items-center gap-3">
            {images?.map((item, idx) => {
              return (
                <div key={idx} className="relative">
                  <img
                    src={item.preview ? item.preview : item.url}
                    alt="house"
                    className={`${item.status === "uploading" ? "h-32 w-32 rounded-md object-cover opacity-50" : "h-32 w-32 rounded-md object-cover"} `}
                  />
                  <p>Progress: {item.progress}</p>
                  {(item.imagekitResponse || item.fileId) && (
                    <button className="absolute top-0 rounded-full h-5 w-5 flex items-center justify-center right-0     text-white bg-red-500 text-center">
                      <RiDeleteBin6Line
                        onClick={() => {
                          imgDeleteHandler(
                            item.imagekitResponse
                              ? item.imagekitResponse.fileId
                              : item.fileId,
                          );
                        }}
                        size={12}
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  formData: PropTypes.object,
  isPhotoUpload: PropTypes.bool,
  images: PropTypes.array,
  imgDeleteHandler: PropTypes.func,
  onClickHandler: PropTypes.func,
};
export default UserCard;

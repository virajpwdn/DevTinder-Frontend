import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/feedSlice";
import PropTypes from "prop-types";
import { RiDeleteBin6Line } from "@remixicon/react";

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
          className="card bg-base-300 w-full shadow-xl absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
          onClick={onClickHandler}
        >
          <figure className="p-4">
            <img
              src={formData?.photo || "/default-avatar.png"}
              alt="photo"
              className="rounded-lg object-cover w-full h-64"
            />
          </figure>
          <div className="card-body flex flex-col items-center text-center">
            <h2 className="card-title text-lg md:text-xl">
              {`${formData?.firstName || "Firstname"} ${formData?.lastName || "LastName"}`}
            </h2>
            <div className="flex flex-wrap gap-4 justify-center text-sm md:text-base mt-2">
              {formData?.age && <span>Age: {formData?.age}</span>}
              {formData?.gender && <span>Gender: {formData?.gender}</span>}
            </div>
            <p className="mt-2">{formData?.bio || "bio"}</p>
            <div className="card-actions justify-center mt-4 flex-wrap gap-2">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  buttonHandler("ignored", formData?._id);
                }}
              >
                Ignored
              </button>
              <button
                className="btn btn-secondary"
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

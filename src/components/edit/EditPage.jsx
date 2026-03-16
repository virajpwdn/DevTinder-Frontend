import { useState } from "react";
import PropTypes from "prop-types";
import { useEditProfile } from "../../utils/hooks/useEditProfile";
import { usePhotoUpload } from "../../utils/hooks/usePhotoUpload";
import EditFormPanel from "./EditFormPanel";
import SocialLinksPanel from "./SocialLinksPanel";
import PhotoUploadPanel from "./PhotoUploadPanel";
import UserCard from "../UserCard";

const EditPage = ({ user }) => {
  const [isPhotoUpload, setIsPhotoUpload] = useState(false);
  const [showSocial, setShowSocial] = useState(false);

  const { formData, error, response, showToast, handleChange, submitHandler } =
    useEditProfile(user);

  const {
    images,
    setImages,
    dragOver,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFiles,
    imgDeleteHandler,
  } = usePhotoUpload();
  console.log("formData2", formData);
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
          {/* Front face */}
          <div
            className="bg-base-200 rounded-lg flex items-center justify-center"
            style={{ backfaceVisibility: "hidden", overflow: "hidden" }}
          >
            {formData && (
              <EditFormPanel
                formData={formData}
                error={error}
                showSocial={showSocial}
                onChange={handleChange}
                onSubmit={submitHandler}
                onPhotoUploadClick={() => setIsPhotoUpload(true)}
                onSocialClick={() => setShowSocial(true)}
              />
            )}

            <SocialLinksPanel
              showSocial={showSocial}
              onBack={() => setShowSocial(false)}
            />
          </div>
          {/* Back face */}
          <PhotoUploadPanel
            dragOver={dragOver}
            fileInputRef={fileInputRef}
            onBack={() => setIsPhotoUpload(false)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileChange={(e) => handleFiles(Array.from(e.target.files))}
          />
        </div>
        {/* Right: User Card */}
        <div className="w-full h-[850px] max-w-[500px] bg-base-200 rounded-lg flex items-center justify-center px-6 py-4">
          <UserCard
            formData={formData}
            isPhotoUpload={isPhotoUpload}
            images={images}
            setImages={setImages}
            imgDeleteHandler={imgDeleteHandler}
          />
        </div>

        {/* Toast */}
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

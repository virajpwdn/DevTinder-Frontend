import PropTypes from "prop-types";
import { RiUpload2Fill } from "@remixicon/react";

const PhotoUploadPanel = ({
  dragOver,
  fileInputRef,
  onBack,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileChange,
}) => {
  return (
    <div
      className="bg-base-200 rounded-lg w-full absolute inset-0 p-14"
      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
    >
      <div className="flex gap-3 items-center">
        <button
          type="button"
          onClick={onBack}
          className="btn rounded-full btn-outline btn-sm"
        >
          ←
        </button>
        <h2 className="text-lg font-bold">Upload Photo</h2>
      </div>

      <div
        className="h-[480px] w-full border border-dotted border-gray-400 rounded-xl mt-16
                    flex flex-col gap-2 items-center justify-center p-4"
      >
        <div
          className={`w-full h-20 border rounded-xl border-dotted border-gray-600
          flex items-center justify-center gap-3 cursor-pointer transition-colors duration-200
          ${dragOver ? "bg-base-300 border-primary" : "bg-base-200"}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <RiUpload2Fill />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={onFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="btn btn-primary btn-sm text-white"
          >
            file upload
          </button>
        </div>
        <p className="text-xs">Drag or Click on the file below</p>
        <p className="text-xs leading-none -mt-1">
          You can only upload up to 6 photos
        </p>
      </div>
    </div>
  );
};

PhotoUploadPanel.propTypes = {
  dragOver: PropTypes.bool.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragLeave: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default PhotoUploadPanel;

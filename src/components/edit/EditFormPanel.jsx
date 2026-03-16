import PropTypes from "prop-types";

const FIELDS = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Gender", name: "gender" },
  { label: "Bio", name: "bio" },
  { label: "Age", name: "age" },
  { label: "Photo", name: "photo" },
  { label: "Skills", name: "skills" },
];

const EditFormPanel = ({
  formData,
  error,
  showSocial,
  onChange,
  onSubmit,
  onPhotoUploadClick,
  onSocialClick,
}) => {
  return (
    <div
      className="w-full px-6 py-4"
      style={{
        transition:
          "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
        transform: showSocial ? "translateY(-100%)" : "translateY(0%)",
        opacity: showSocial ? 0 : 1,
      }}
    >
      <form className="card-body" onSubmit={onSubmit}>
        {FIELDS.map((field) => (
          <div className="form-control" key={field.name}>
            <label className="label">
              <span className="label-text text-xs uppercase">
                {field.label}
              </span>
            </label>
            <input
              type="text"
              placeholder={field.label}
              className="input input-bordered"
              value={formData[field.name]}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          </div>
        ))}

        <p className="text-red-500 text-xs">{error}</p>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Update Profile</button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onPhotoUploadClick}
            className="btn btn-outline flex-1"
          >
            Upload Photos
          </button>
          <button
            type="button"
            onClick={onSocialClick}
            className="btn btn-outline flex-1"
          >
            Add Social Links
          </button>
        </div>
      </form>
    </div>
  );
};

EditFormPanel.propTypes = {
  formData: PropTypes.object.isRequired,
  error: PropTypes.string,
  showSocial: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onPhotoUploadClick: PropTypes.func.isRequired,
  onSocialClick: PropTypes.func.isRequired,
};

export default EditFormPanel;

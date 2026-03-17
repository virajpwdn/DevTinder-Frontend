import PropTypes from "prop-types";

const SOCIAL_FIELDS = [
  { label: "LinkedIn", name: "linkedIn" },
  { label: "Twitter", name: "twitter" },
  { label: "GitHub", name: "gitHub" },
  { label: "Instagram", name: "instagram" },
  { label: "Website", name: "website" },
];

const SocialLinksPanel = ({
  showSocial,
  onBack,
  onSubmit,
  formData,
  onChange,
  error,
}) => {
  return (
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
        <button
          type="button"
          onClick={onBack}
          className="btn rounded-full btn-outline btn-sm"
        >
          ←
        </button>
        <h2 className="text-lg font-bold">Add Social Links</h2>
      </div>
      {/* social link fields go here */}
      <form className="card-body" onSubmit={onSubmit}>
        {SOCIAL_FIELDS.map((field) => (
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
              value={formData.socialLinks[field.name]}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          </div>
        ))}

        <p className="text-red-500 text-xs">{error}</p>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Update Social Links</button>
        </div>
      </form>
    </div>
  );
};

SocialLinksPanel.propTypes = {
  showSocial: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  formData: PropTypes.object,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default SocialLinksPanel;

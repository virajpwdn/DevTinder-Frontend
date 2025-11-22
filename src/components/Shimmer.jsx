const Shimmer = () => {
  const ShimmerElement = ({ className }) => (
    <div
      className={`bg-slate-200 rounded relative overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500"
        style={{
          animation: "shimmer 1.5s infinite",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 py-8">
      <style>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>

      <div className="card bg-base-300 w-full max-w-sm shadow-xl">
        {/* Image */}
        <figure className="p-4">
          <ShimmerElement className="w-full h-64" />
        </figure>

        {/* Body */}
        <div className="card-body p-6">
          {/* Title */}
          <div className="flex justify-center mb-4">
            <ShimmerElement className="w-32 h-7" />
          </div>

          {/* Age & Gender Info */}
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            <ShimmerElement className="w-20 h-5" />
            <ShimmerElement className="w-24 h-5" />
          </div>

          {/* Bio Lines */}
          <div className="space-y-2 mb-6">
            <ShimmerElement className="w-full h-4" />
            <ShimmerElement className="w-5/6 h-4 mx-auto" />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            <ShimmerElement className="w-28 h-10 rounded-lg" />
            <ShimmerElement className="w-32 h-10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;

// ✅ One reusable Shimmer component
const Shimmer = ({
  height = "h-4",
  width = "w-full",
  rounded = "rounded-md",
  count = 1,
}) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`${height} ${width} ${rounded} bg-gray-200 animate-pulse`}
          />
        ))}
    </>
  );
};

export default Shimmer;

const Shimmer = () => {
  return (
    <div className="flex w-screen h-screen flex-col gap-4 items-center justify-center">
      <div className="skeleton h-32 w-52"></div>
      <div className="skeleton h-14 w-28"></div>
      <div className="skeleton h-14 w-52"></div>
      <div className="skeleton h-14 w-52"></div>
    </div>
  );
};

export default Shimmer;
const PhotoContainer = ({ height, width, src, text, className }) => {
  return (
    <div className={`h-${height} w-${width} rounded-2xl ${className}`}>
      <img
        src={src}
        className="h-[500px] w-[350px] object-cover object-left-top rounded-2xl"
        alt={text}
      />
      {text && (
        <p className="max-sm:text-center mt-3 text-2xl sm:text-3xl">{text}</p>
      )}
    </div>
  );
};
export default PhotoContainer;

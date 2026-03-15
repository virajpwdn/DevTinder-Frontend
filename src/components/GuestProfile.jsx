import { useSearchParams } from "react-router";
import {
  RiGithubLine,
  RiInstagramLine,
  RiTwitterLine,
  RiGlobeLine,
} from "@remixicon/react";
import { useEffect, useState } from "react";
import userService from "../service/user.service";

const GuestProfile = () => {
  const [searchParams] = useSearchParams();
  const [photos, setPhotos] = useState([]);

  const formData = {
    _id: searchParams.get("_id"),
    firstName: searchParams.get("firstName"),
    lastName: searchParams.get("lastName"),
    gender: searchParams.get("gender"),
    age: searchParams.get("age") ?? "",
    bio: searchParams.get("bio"),
    skills:
      searchParams
        .get("skills")
        ?.replace(/^\[|\]$/g, "")
        ?.split(",") ?? [],
    photo: searchParams.get("photo"),
  };

  useEffect(() => {
    const getImages = async () => {
      try {
        const photos = await userService.getAllPhotos();
        console.log("Photos", photos);
        setPhotos(photos.data.photos);
      } catch (error) {
        console.error(error);
      }
    };
    getImages();
  }, []);

  console.log("formdata - ", formData);
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center max-md:px-5">
      <div className="w-[740px] mx-auto rounded-lg bg-black/25 h-[480px] flex gap-4 p-3">
        <div className="flex-1 pl-5 pt-5 relative">
          <div id="cover-photo" className="rounded-md -ml-3 z-0 relative">
            <img
              className="rounded-lg h-40 w-full object-cover"
              src="/orange-gradient.png"
              alt=""
            />
            <div className="flex absolute bottom-3 right-3 text-white gap-2">
              <RiGithubLine />
              <RiGlobeLine />
              <RiInstagramLine />
              <RiTwitterLine />
            </div>
          </div>
          <div className="absolute top-32 w-full ">
            <div id="img-container" className="h-24 w-24 rounded-lg z-10">
              <img
                src="https://images.unsplash.com/photo-1772340751788-4515ebbd55df?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="size-full rounded-md"
              />
            </div>
            <h3 className="text-2xl font-semibold">
              {formData.firstName + " " + formData.lastName}
            </h3>
            <p className="text-sm font-light">{formData.bio}</p>
            <p className="py-2 space-x-3 mt-5">
              Skills:{" "}
              {formData.skills.map((skill, idx) => (
                <span className="border border-dotted p-1 rounded-md" key={idx}>
                  {skill}
                </span>
              ))}
            </p>
            <div className="flex gap-4">
              <p>Age: {formData.age ? formData.age : "N/A"}</p>
              <p>Gender: {formData.gender}</p>
            </div>

            <div className="flex gap-2 w-full mt-5 -ml-3">
              <button
                className="flex-1 btn btn-primary"
                // onClick={() => buttonHandler("ignored", formData?._id)}
              >
                Ignored
              </button>
              <button
                className="flex-1 btn btn-secondary"
                // onClick={() => buttonHandler("interested", formData?._id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 border-l border-gray-700">
          {photos.length === 0 ? (
            <p className="flex items-center justify-center h-full">
              No images found!
            </p>
          ) : (
            <>
              <div>
                {photos.map((img) => {
                  console.log(img);
                  // <img src={img.url} alt="" />
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default GuestProfile;

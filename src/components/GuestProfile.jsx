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
        const photos = await userService.getAllPhotos(formData._id);
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
      <div className="w-[740px] mx-auto rounded-lg bg-black/25 flex gap-4 p-3 py-10 flex-col md:flex-row">
        <div className="flex-1 pl-5 relative">
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
          <div className="-mt-14 w-full relative z-50">
            <div id="img-container" className="h-24 w-24 rounded-lg z-10">
              <img
                src={formData.photo}
                alt=""
                className="size-full rounded-md object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mt-2">
              {formData.firstName + " " + formData.lastName}
            </h3>
            <p className="text-sm font-light">{formData.bio}</p>
            <p className="mt-5 font-bold">Skills </p>
            <p className="py-2 flex flex-wrap gap-3">
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
        <div className="flex-1 border-t mt-5 pt-5 md:mt-0 md:pt-0 md:border-l md:border-t-0 border-gray-700">
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

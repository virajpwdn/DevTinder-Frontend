import { RiShiningFill, RiUserStarFill } from "@remixicon/react";

const Pricing = () => {
  return (
    <div className="bg-white py-40">
      <h1 className="text-center text-5xl font-light">Plans & Pricing</h1>
      <div className="p-20 bg-[#F9F9F9] m-20 rounded-2xl flex items-center justify-center gap-20">
        <div className="bg-white p-5 w-[410px] rounded-lg">
          <div className="top bg-[#F9F9F9] p-3 rounded-lg">
            <div className="rounded-full bg-[#EFE9FF] h-7 w-7 flex items-center justify-center">
              <RiShiningFill color="black" size={16} />
            </div>
            <div className="cta flex flex-col gap-5 text-black mt-5">
              <h4 className="text-xl">Basic</h4>
              <h4 className="text-3xl font-semibold">Free</h4>
              <h4 className="text-sm">Free Forever</h4>
              <button className="w-full py-3 bg-gradient-to-br from-[#5C21DA] to-[#6523E9] rounded-lg text-white shadow-md text-sm">
                Choose this plan
              </button>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-black/60">Basic Plan Include</p>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiUserStarFill color="black" size={20} />
                20 emails per month
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiUserStarFill color="black" size={20} />
                20 emails per month
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiUserStarFill color="black" size={20} />
                20 emails per month
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiUserStarFill color="black" size={20} />
                20 emails per month
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-5 w-[410px] rounded-lg">
          <div className="top bg-gradient-to-br from-[#6725F3] via-[#581ECE] to-[#4718A4] p-3 rounded-lg">
            <div className="rounded-full bg-[#EFE9FF] h-7 w-7 flex items-center justify-center">
              <RiShiningFill color="black" size={16} />
            </div>
            <div className="cta flex flex-col gap-5 text-white mt-5">
              <h4 className="text-xl">Premium</h4>
              <h4 className="text-3xl font-semibold">$ 600</h4>
              <h4 className="text-sm">Per month</h4>
              <button className="w-full py-3 bg-gradient-to-br from-[#5C21DA] to-[#6523E9] rounded-lg text-white shadow-md text-sm">
                Choose this plan
              </button>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-black/60">Basic Plan Include</p>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiUserStarFill color="black" size={20} />
                20 emails per month
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiUserStarFill color="black" size={20} />
                20 emails per month
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiUserStarFill color="black" size={20} />
                20 emails per month
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiUserStarFill color="black" size={20} />
                20 emails per month
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pricing;

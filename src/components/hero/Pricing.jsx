import { RiAddLine, RiShiningFill } from "@remixicon/react";
import PaymentService from "../../service/payment.service";
import { useState } from "react";
import { useNavigate } from "react-router";

const Pricing = () => {
  const [premiumUser, setPremiumUser] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const verifyPremiumUser = async () => {
    try {
      const response = PaymentService.verifyUserPremium();
      if (response.data.isPremium === true) {
        setPremiumUser(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const paymentTypeHandler = async (membershipType) => {
    try {
      const order = await PaymentService.createOrder(membershipType);
      const { orderId, amount, currency, notes, key } = order.data;

      const options = {
        key: key,
        amount: amount,
        currency: currency,
        name: "Dev Tinder",
        description: "A place where developers can connect",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white py-40">
      <h1 className="text-center text-5xl font-light">Plans & Pricing</h1>
      <div className="p-20 bg-[#F9F9F9] m-5 sm:m-20 rounded-2xl flex flex-col lg:flex-row items-center justify-center gap-20">
        <div className="bg-white p-5 h-[550px] w-[410px] rounded-lg">
          <div className="top bg-[#F9F9F9] p-3 rounded-lg">
            <div className="rounded-full bg-[#EFE9FF] h-7 w-7 flex items-center justify-center">
              <RiShiningFill color="black" size={16} />
            </div>
            <div className="cta flex flex-col gap-5 text-black mt-5">
              <h4 className="text-xl">Basic</h4>
              <h4 className="text-3xl font-semibold">Free</h4>
              <h4 className="text-sm">Free Forever</h4>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-gradient-to-br from-[#5C21DA] to-[#6523E9] rounded-lg text-white shadow-md text-sm hover:bg-gradient-to-br hover:from-black hover:to-black"
              >
                Choose this plan
              </button>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-black/60">Basic Plan Include</p>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  connect with{" "}
                  <b className="text-black/50"> like-minded people </b>
                </p>
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  <b className="text-black/50">one to one chat </b>
                  after connection
                </p>
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  <b className="text-black/50">customise</b> your profile
                  (limited)
                </p>
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  <b className="text-black/50">no backtracking</b>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white h-[550px] p-5 w-[410px] rounded-lg ">
          <div className="top bg-gradient-to-br from-[#6725F3] via-[#581ECE] to-[#4718A4] p-3 rounded-lg relative">
            <div className="rounded-full bg-[#EFE9FF] h-7 w-7 flex items-center justify-center">
              <RiShiningFill color="black" size={16} />
            </div>
            <div className="cta flex flex-col gap-5 text-white mt-5">
              <h4 className="text-xl">Premium</h4>
              <h4 className="text-3xl font-semibold">
                Rs 700<span className="text-xs font-light"> / per month</span>
              </h4>
              <h4 className="text-sm">Per month</h4>
              <button
                onClick={() => paymentTypeHandler("gold")}
                className="w-full py-3 bg-gradient-to-br from-[#5C21DA] to-[#6523E9] rounded-lg text-white shadow-md text-sm hover:bg-gradient-to-br hover:from-black hover:to-black"
              >
                Choose this plan
              </button>
            </div>
            <span className="text-xs bg-[#6A24F8]/60 shadow-sm text-white px-4 py-1 rounded-xl absolute top-4 right-4">
              Most Popular
            </span>
          </div>

          <div className="pt-4">
            <p className="text-black/60">Basic Plan Include</p>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />

                <p>
                  Get a <b className="text-black/50">verified</b> Blue Tick
                </p>
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  Unlimited <b className="text-black/50">Backtracking</b> per
                  week
                </p>
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  Send Unlimited
                  <b className="text-black/50"> Direct Messages</b>
                </p>
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  Share <b className="text-black/50">Project Ideas</b> on feed
                </p>
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  Connect <b className="text-black/50">Git Account</b> to share
                  projects
                </p>
              </li>
              <li className="flex gap-3 items-center justify-start leading-none">
                <RiAddLine size={20} color="gray" />
                <p>
                  <b className="text-black/50">12 Months Access</b>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pricing;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [error, setError] = useState("");
  const [premiumUser, setPremiumUser] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/shop/premium/verify", {
        withCredentials: true,
      });
      if (response.data.isPremium === true) {
        setPremiumUser(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const paymentTypeHandler = async (membershipType) => {
    try {
      const order = await axios.post(
        BASE_URL + "/shop/payment/create",
        { membershipType },
        { withCredentials: true }
      );

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
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      {premiumUser ? (
        <div className="text-center text-2xl font-bold text-green-500">
          You are already a premium user
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
          {/* Silver Membership */}
          <div className="card bg-base-200 rounded-xl p-6 flex-1 shadow-md">
            <h1 className="font-bold text-3xl uppercase text-center mb-6">
              Silver <span className="text-sky-400 underline">Membership</span>
            </h1>
            <ol className="list-decimal list-inside space-y-2 text-base pl-4">
              <li>50 Backtracking per week</li>
              <li>6 Months Access</li>
              <li>Send Direct Message to 20 people per day</li>
              <li>Share Project Ideas on feed</li>
              <li>Connect Git Account to share projects</li>
            </ol>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => paymentTypeHandler("silver")}
                className="btn bg-emerald-500 text-black font-semibold"
              >
                Pay Now
              </button>
            </div>
          </div>

          {/* Divider for mobile and desktop */}
          <div className="lg:divider lg:divider-horizontal text-xl font-bold text-gray-500 text-center">
            OR
          </div>

          {/* Gold Membership */}
          <div className="card bg-base-200 rounded-xl p-6 flex-1 shadow-md">
            <h1 className="font-bold text-3xl uppercase text-center mb-6">
              Gold <span className="text-yellow-500 underline">Membership</span>
            </h1>
            <ol className="list-decimal list-inside space-y-2 text-base pl-4">
              <li>Get a verified Blue Tick</li>
              <li>Unlimited Backtracking per week</li>
              <li>12 Months Access</li>
              <li>Send Unlimited Direct Messages</li>
              <li>Share Project Ideas on feed</li>
              <li>Connect Git Account to share projects</li>
            </ol>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => paymentTypeHandler("gold")}
                className="btn bg-emerald-500 text-black font-semibold"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;

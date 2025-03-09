import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [error, setError] = useState("");
  const paymentTypeHandler = async (membershipType) => {
    try {
      const order = await axios.post(
        BASE_URL + "/shop/payment/create",
        { membershipType },
        { withCredentials: true }
      );

      console.log(order);

      
      const { orderId, amount, currency, notes, key } = order.data;

      const options = {
        key: key, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: currency,
        name: "Dev Tinder",
        description: "A place where developers can connect",
        order_id: orderId, // This is the order_id created in the backend
        // callback_url: "http://localhost:3000/payment-success", // Your success URL
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-full flex-col lg:flex-row p-10">
        <div className="card bg-base-300 rounded-box py-10 grid grow place-items-center">
          <h1 className="font-bold text-3xl uppercase mb-10">
            Silver <span className="text-sky-400 underline">Membership</span>
          </h1>
          <ol className="list-decimal">
            <li>50 Backtracking per week</li>
            <li>6 Months Access</li>
            <li>Send Direct Message to 20 people per day</li>
            <li>Share Project Ideas on feed</li>
            <li>Connect Git Account to share projects</li>
          </ol>
          <button
            onClick={() => {
              paymentTypeHandler("silver");
            }}
            className="bg-emerald-500 px-4 py-2 text-black font-semibold rounded-md mt-10"
          >
            Pay Now
          </button>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid py-10 grow place-items-center">
          <h1 className="font-bold text-3xl mb-10 uppercase">
            Gold <span className="text-yellow-500 underline">Membership</span>
          </h1>
          <ol className="list-decimal">
            <li>Get a verified Blue Tick</li>
            <li>Unlimited Backtracking per week</li>
            <li>12 Months Access</li>
            <li>Send Unlimited Direct Message</li>
            <li>Share Project Ideas on feed</li>
            <li>Connect Git Account to share projects</li>
          </ol>
          <button
            onClick={() => {
              paymentTypeHandler("gold");
            }}
            className="bg-emerald-500 px-4 py-2 text-black font-semibold rounded-md mt-10"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;

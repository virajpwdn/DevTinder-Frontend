import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const buttonHandler = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id
      , {}, {withCredentials:true});

      dispatch(removeRequest(id));
    } catch (error) {
      // TODO: store errors in state variable
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response.data));
    } catch (error) {
      // TODO: store errors in state variable
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!requests) return;

  if (requests?.receivedRequests?.length === 0)
    return (
      <h3 className="text-center text-sm min-h-screen mt-10">
        {requests?.message || "No Request Found"}
      </h3>
    );

    return (
      <div className="px-4 min-h-screen">
        <h2 className="text-center font-semibold text-[1.1em] mt-5 mb-10 sm:mb-20">
          Connection Requests
        </h2>
        {requests?.receivedRequests?.map((elem) => {
          const { _id, firstName, lastName, gender, age, bio, photo } = elem.fromUserId;
    
          return (
            <div key={_id} className="my-6 flex justify-center">
              <div className="flex flex-col sm:flex-row items-center bg-base-100 shadow-md rounded-lg p-4 gap-4 w-full max-w-3xl">
                {/* Profile Image */}
                <div className="h-20 w-20 shrink-0 rounded-full overflow-hidden">
                  <img
                    src={photo}
                    alt="user"
                    className="h-full w-full object-cover"
                  />
                </div>
    
                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="font-medium text-lg">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <h3 className="text-sm text-gray-500">{gender + ", " + age}</h3>}
                  <h3 className="text-sm mt-1">{bio}</h3>
                </div>
    
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => buttonHandler("rejected", elem._id)}
                  >
                    Ignore
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => buttonHandler("accepted", elem._id)}
                  >
                    Interested
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
};

export default Requests;

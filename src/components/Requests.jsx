import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../store/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
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
      <h3 className="text-center text-sm">
        {requests?.message || "No Request Found"}
      </h3>
    );

  return (
    <div>
      <h2 className="text-center font-semibold text-[1.1em] mb-20 mt-5">
        Connection Requests
      </h2>
      {requests?.receivedRequests?.map((elem, idx) => {
        const { firstName, lastName, gender, age, bio, photo } =
          elem.fromUserId;
        return (
          <div key={idx} className="min-h-screen">
            <div className="flex items-center justify-center gap-5 my-5 ">
              <div className="left h-20 w-20 rounded-full">
                <img
                  className="h-full w-full rounded-full"
                  src={photo}
                  alt="photo"
                />
              </div>
              <div className="right">
                <h2>{firstName + " " + lastName}</h2>
                {age && gender && <h3>{gender + ", " + age}</h3>}
                <h3>{bio}</h3>
              </div>
              <div className="card-actions items-center justify-center">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

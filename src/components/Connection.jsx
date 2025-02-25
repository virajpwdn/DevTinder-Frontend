import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/connectionsSlice";
import store from "../store/appStore";

const Connection = () => {
  const connection = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response?.data));
    } catch (error) {
      console.log(error);
      //   TODO: create state variable for errors
    }
  };
  console.log("Redux State:", connection?.data); // Debugging

  useEffect(() => {
    fetchData();
  }, []);

  if (!connection) return;
  if (connection?.data?.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="text-center min-h-screen mt-5">
      <h1 className="font-semibold text-2xl">Connections</h1>
      {connection.data.map((elem, idx) => {
        const { firstName, lastName, gender, photo, age, bio } = elem;
        return (
          <div key={idx} className="flex items-center gap-5 p-5 justify-center">
            <div className="left">
              <img
                className="w-20 h-20 rounded-full object-cover object-top"
                src={photo}
                alt="photo"
              />
            </div>
            <div className="right flex flex-col items-start">
              <h2 className="font-semibold text-xl">
                {firstName + " " + lastName}
              </h2>
              {gender && age && <h3>{gender + ", " + age}</h3>}
              <p>{bio}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;

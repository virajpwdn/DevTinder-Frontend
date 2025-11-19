import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/connectionsSlice";
import store from "../store/appStore";
import Chat from "../chat/Chat";
import { Link } from "react-router";

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
      // Add a winston logger
    }
  };
  console.log("Redux State:", connection?.data); // Debugging

  useEffect(() => {
    fetchData();
  }, []);

  if (!connection) return;
  if (connection?.data?.length === 0)
    return (
      <div className="h-screen flex items-center justify-center">
        <h1>No Connections Found</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Connections</h1>

      <div className="space-y-6 max-w-3xl mx-auto">
        {connection.data.map((elem) => {
          const { _id, firstName, lastName, gender, photo, age, bio } = elem;
          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between bg-gray-800 p-5 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  className="w-20 h-20 rounded-full object-cover object-top border-2 border-emerald-500"
                  src={photo}
                  alt="photo"
                />

                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">
                    {firstName} {lastName}
                  </h2>
                  {gender && age && (
                    <p className="text-sm text-gray-300">
                      {gender}, {age}
                    </p>
                  )}
                  <p className="text-sm text-gray-400">{bio}</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                <Link to={`/chat/${_id}`}>
                  <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 transition rounded-lg text-sm font-medium shadow">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;

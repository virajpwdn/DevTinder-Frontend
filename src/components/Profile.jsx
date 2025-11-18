import React from "react";
import EditPage from "./EditPage";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import store from "../store/appStore";

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log("USER -> ", user)
  return user && <div>{<EditPage user={user} />}</div>;
};

export default Profile;

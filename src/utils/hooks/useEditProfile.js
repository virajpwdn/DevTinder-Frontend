import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addUser } from "../../store/userSlice";
import { BASE_URL } from "../constants";
import { truncateText } from "../truncateText";

export const useEditProfile = (user) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.gender || "",
    age: user?.age || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    photo: user?.photo || "",
    socialLinks: user?.socialLinks || {},
  });

  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: truncateText(value) }));
  };

  const handleSocialLinksChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: truncateText(value),
      },
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // const ageAsNumber =
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { ...formData, age: formData.age ? parseInt(formData.age, 10) : null },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data));
      setError("");
      setResponse(res.data.message);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return { formData, error, response, showToast, handleChange, submitHandler, handleSocialLinksChange };
};

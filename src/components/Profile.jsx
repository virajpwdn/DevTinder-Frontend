import EditPage from "./EditPage";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user && <div>{<EditPage user={user} />}</div>;
};

export default Profile;

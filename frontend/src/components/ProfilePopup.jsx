import { useNavigate } from "react-router-dom";

const ProfilePopup = () => {
  const navigate = useNavigate();
 

  const handlesignout = () => {
    // 🔐 remove auth token
    localStorage.removeItem("token");

    // 🔁 redirect to signin
    navigate("/signin");
  };

  

  return (
    <div className="profile-popup">
      <p>My Profile</p>
      <p>Settings</p>
      <p onClick={handlesignout}>signout</p>
    </div>
  );
};

export default ProfilePopup;

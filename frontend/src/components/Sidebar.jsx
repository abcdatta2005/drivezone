import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfilePopup from "./ProfilePopup";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

      {/* 🔝 SIDEBAR HEADER */}
      <div className="sidebar-header">
        <button className="icon-btn" onClick={() => navigate("/home")}>
          🏠
        </button>

        {sidebarOpen && <span className="sidebar-title">askmock</span>}

        <button
          className="icon-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </div>

      {/* 📂 SIDEBAR LINKS */}
      <div className="sidebar-top">
        <Link to="/aptitude" className="sidebar-link">
          🧠 {sidebarOpen && "Aptitude"}
        </Link>

        <Link to="/dsa" className="sidebar-link">
          💻 {sidebarOpen && "DSA"}
        </Link>

        <Link to="/mock" className="sidebar-link">
          🎤 {sidebarOpen && "MockInterview"}
        </Link>
      </div>
    <div
  className="profile-box"
  onClick={() => setShowProfile(!showProfile)}
>
  <img
    src="/profile.png"
    alt="profile"
    className="profile-img"
  />

  {sidebarOpen && <span className="profile-text">Profile</span>}

  {showProfile && <ProfilePopup />}
</div>

    </div>
  );
};

export default Sidebar;

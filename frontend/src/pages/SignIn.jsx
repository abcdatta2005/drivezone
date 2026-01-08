import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./../styles/Auth.css";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [robot, setRobot] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ simple frontend validation
    if (!robot) {
      setError("Please confirm you are not a robot");
      return;
    }

    try {
      setLoading(true);

        const API = process.env.REACT_APP_API_URL || "http://localhost:3113";
        const response = await axios.post(`${API}/api/auth/signin`, {
          username,
          password
        });

      // ✅ axios auto parses JSON
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      // ✅ axios error handling
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Sign In</h2>

        {error && <p className="error-text">{error}</p>}

        <div className="form-row">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={robot}
            onChange={(e) => setRobot(e.target.checked)}
          />
          <label>I am not a robot</label>
        </div>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="redirect-text">
          Don’t have an account? <Link to="/">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

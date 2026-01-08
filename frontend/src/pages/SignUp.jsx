import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./../styles/Auth.css";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // frontend validation
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const API = process.env.REACT_APP_API_URL || "http://localhost:3113";

      const response = await axios.post(`${API}/api/auth/signup`, {
        username,
        email,
        password,
        confirmpassword
      });

      if (response.data.success) {
        navigate("/signin");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Sign Up</h2>

        {error && <p className="error-text">{error}</p>}

        <div className="form-row">
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
          />
        </div>

        <button className="auth-btn" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="redirect-text">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

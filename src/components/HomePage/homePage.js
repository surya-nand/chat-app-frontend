import React from "react";
import { useState } from "react";
import axios from "axios";
import "../HomePage/homepage.modules.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5000";

function Homepage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  localStorage.setItem("userInfo", "");
  localStorage.setItem("token", "");
  const [signupActive, setSignupActive] = useState(false);
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginActiveButton = () => {
    if (signupActive) {
      setSignupActive(!signupActive);
    }
  };

  const handleSignupActiveButton = () => {
    toast.info("Contact admin for registration")
  }

  const handleAdminCredentialsClick = (e) => {
    e.preventDefault();
    setLoginData({
      email: "admin123@gmail.com",
      password: "12345678",
    });
  };

  const handleGuestCredentialsClick = (e) => {
    e.preventDefault();
    setLoginData({
      email: "guest123@gmail.com",
      password: "12345678",
    });
  };
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        loginData
      );
      toast.info(response.data.message);
      if (
        response.data.message === "Login Successful" &&
        response.data.userRole === "admin"
      ) {
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.userDetails)
        );
        localStorage.setItem("token", response.data.token);
        navigate("/admin");
      } else if (
        response.data.message === "Login Successful" &&
        response.data.userRole === "user"
      ) {
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.userDetails)
        );
        localStorage.setItem("token", response.data.token);
        navigate("/chat");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid email or password");
      } else {
        console.error("Error during login:", error.message);
        toast.error("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage">
        <div className="app-title">
          <h1>Chat Blast</h1>
        </div>
        <div className="login-signup-buttons">
          <button
            className={`signup-button ${signupActive ? "active" : ""}`}
            onClick={handleSignupActiveButton}
          >
            Sign Up
          </button>
          <button
            className={`login-button ${!signupActive ? "active" : ""}`}
            onClick={handleLoginActiveButton}
          >
            Log In
          </button>
        </div>
        <div className="user-details">
          {signupActive ? (
            ''
          ) : (
            <form method="POST" onSubmit={handleLoginFormSubmit}>
              <div className="login-details">
                <div className="email-input">
                  <p>Email</p>
                  <input
                    required
                    className="user-email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginInputChange}
                  ></input>
                </div>
                <div className="password-input">
                  <p>Password</p>
                  <input
                    required
                    className="user-password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                  ></input>
                </div>
                <div className="login-guest-buttons-group">
                  <button type="submit" className="login-submit-button">
                    Log In
                  </button>
                  <button
                    className="guest-credentials-button"
                    onClick={handleGuestCredentialsClick}
                  >
                    Guest Credentials
                  </button>
                  <button
                    className="guest-credentials-button"
                    onClick={handleAdminCredentialsClick}
                  >
                    Admin credentials
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;

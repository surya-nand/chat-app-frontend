import React from "react";
import { useState } from "react";
import axios from "axios";
import "../HomePage/homepage.modules.css";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Homepage() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupActive, setSignupActive] = useState(true);

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignupActiveButton = () => {
    if (!signupActive) {
      setSignupActive(!signupActive);
    }
  };
  const handleLoginActiveButton = () => {
    if (signupActive) {
      setSignupActive(!signupActive);
    }
  };

  const handleGuestCredentialsClick = (e) => {
    e.preventDefault();
    setLoginData({
        email: "guest123@gmail.com",
        password:"123456"
    })
  }
  const handleLoginFormSubmit = () => {};
  const handleRegisterFormSubmit = () => {};
  //   const handleLoginFormSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       const response = await axios.post(
  //         `${BASE_URL}/api/users/login`,
  //         loginData
  //       );
  //       toast.info(response.data.message);
  //       if (response.data.message === "Login Successful") {
  //         localStorage.setItem("token",response.data.token)
  //         navigate("/dashboard", {
  //           state: {
  //             loggedInUser: response.data.userDetails,
  //           },
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const handleRegisterFormSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       const response = await axios.post(
  //         `${BASE_URL}/api/users/register`,
  //         registerData
  //       );
  //       toast.info(response.data.message);
  //       if (response.data.message === "Registration Successful. Please Login") {
  //         setSignupActive(!signupActive);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
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
            <form method="POST" onSubmit={handleRegisterFormSubmit}>
              <div className="registration-details">
                <div className="username-input">
                  <p>Name</p>
                  <input
                    className="user-name"
                    type="name"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterInputChange}
                    required
                  ></input>
                </div>
                <div className="email-input">
                  <p>Email</p>
                  <input
                    className="user-email"
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterInputChange}
                    required
                  ></input>
                </div>
                <div className="password-input">
                  <p>Password</p>
                  <input
                    className="user-password"
                    type="password"
                    name="password"
                    value={registerData.password}
                    minLength={6}
                    onChange={handleRegisterInputChange}
                    required
                  ></input>
                </div>
                <div className="confirm-password-input">
                  <p>Confirm Password</p>
                  <input
                    className="user-confirm-password"
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterInputChange}
                    required
                  ></input>
                </div>
                <button type="submit" className="signup-submit-button">
                  Sign up
                </button>
              </div>
            </form>
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
                <button  className="guest-credentials-button" onClick={handleGuestCredentialsClick}>
                  Guest Credentials
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

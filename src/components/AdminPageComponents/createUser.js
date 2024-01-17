import React, { useState } from "react";
import "./createUser.modules.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChat } from "../../context/chatContext";
const BASE_URL = "http://localhost:5000";

const CreateUser = () => {
  const [isRegisterPageOpen, setIsRegisterPageOpen] = useState(false);
  const token = localStorage.getItem("token");
  const {setRefreshUsersList} = useChat();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    picture: "",
    password: "",
    confirmPassword: "",
  });
  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterFormSubmit = async (event) => {
    console.log(token)
    event.preventDefault();
    try {

      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/api/users/register`,
        registerData,config
      );
      console.log(config)
      console.log(response.data.error)
      toast.info(response.data.message);
      if (response.data.message === "Registration Successful. Please Login") {
        setIsRegisterPageOpen(false)
        setRefreshUsersList((prev) => !prev);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleRegisterPageOpen = (e) => {
    e.preventDefault();
    setIsRegisterPageOpen(true);
  };

  const handleRegisterPageClose = (e) => {
    e.preventDefault();
    setIsRegisterPageOpen(false);
  };


  return (
    <>
      <div className="create-new-user">
        <button onClick={handleRegisterPageOpen}>+ Create New User</button>
      </div>
      {isRegisterPageOpen && (
        <>
          <div className="overlay">
            <form method="POST" onSubmit={handleRegisterFormSubmit}>
              <div className="registration-details">
                <div
                  onClick={handleRegisterPageClose}
                  className="register-close-button"
                >
                  x
                </div>
                <div className="username-input">
                  <p>Name</p>
                  <input
                    className="user-name"
                    type="name"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterInputChange}
                    placeholder="Enter your Name"
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
                    placeholder="Enter your Email"
                    required
                  ></input>
                </div>
                <div className="email-input">
                  <p>Picture</p>
                  <input
                    className="user-email"
                    type="link"
                    name="picture"
                    value={registerData.picture}
                    onChange={handleRegisterInputChange}
                    placeholder="Enter your Picture Link"
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
                    minLength={8}
                    onChange={handleRegisterInputChange}
                    placeholder="Enter your Password"
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
                    placeholder="Confirm Password"
                    minLength={8}
                    required
                  ></input>
                </div>
                <button type="submit" className="signup-submit-button">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};
export default CreateUser;

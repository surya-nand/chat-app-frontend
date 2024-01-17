import React, { useState, useEffect } from "react";
import "../AdminPageComponents/userList.modules.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChat } from "../../context/chatContext";
const BASE_URL = "http://localhost:5000";

const UserList = ({ users }) => {
  const { setRefreshUsersList } = useChat();
  const [userToBeEditedId, setUserToBeEditedId] = useState("");
  const [isEditUserPageOpen, setIsEditUserPageOpen] = useState(false);
  const token = localStorage.getItem("token");
  const handleEditUserButton = (userId) => {
    setIsEditUserPageOpen(true);
    setUserToBeEditedId(userId);
  };

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    picture: "",
  });

  const fetchUser = async () => {
    if (userToBeEditedId) {
      try {
        const config = {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get(
          `${BASE_URL}/api/users/fetch/${userToBeEditedId}`,
          config
        );
        if (response.data.message === "User fetched successfully") {
          setRegisterData(response.data.details);
        } else {
          toast.error("Failed in fetching user");
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userToBeEditedId]);

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditUserFormSubmit = async (e) => {
    setRefreshUsersList((prev) => !prev);
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        `${BASE_URL}/api/users/fetch/${userToBeEditedId}`,
        registerData,
        config
      );
      if (response.data.message === "user details updated") {
        toast.info("user updated successfully");
        setIsEditUserPageOpen((prev) => !prev);
        setRegisterData(response.data.details);
      } else {
        toast.error("Failed in updating user");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }else{
        toast.error("An unexpected error occurred")
      }
    }
  };

  const handleRegisterPageClose = (e) => {
    e.preventDefault();
    setIsEditUserPageOpen(false);
  };
  return (
    <>
      <div className="user-results-container">
        {users.length < 1 ? (
          <div className="loading-users">Loading Users...</div>
        ) : (
          ""
        )}
        {users?.map((user) => (
          <div key={user._id} className="each-user-result-container">
            <div className="user-results-user-picture">
              <img src={user.picture} alt="user-profile"></img>
            </div>
            <div className="user-results-name-email">
              <p>{user.name}</p>
              <p className="user-results-email">{user.email}</p>
            </div>
            <div className="user-edit">
              <button
                onClick={() => handleEditUserButton(user._id)}
                className="each-user-edit-button"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        {isEditUserPageOpen && (
          <div className="overlay">
            <form method="POST" onSubmit={handleEditUserFormSubmit}>
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
                    placeholder="Modify Name"
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
                    placeholder="Modify Email"
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
                    placeholder="Modify Picture Link"
                    required
                  ></input>
                </div>
                <button type="submit" className="signup-submit-button">
                  Edit User
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;

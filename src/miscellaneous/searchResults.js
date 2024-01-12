import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../miscellaneous/searchResults.modules.css";

const BASE_URL = "http://localhost:5000";

const SearchResults = ({ searchResults }) => {
  const token = localStorage.getItem("token");
  const [accessedChat, setAccessedChat] = useState();
  const handleAccessChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/api/chat`,
        { userId },
        config
      );
      setAccessedChat(response.data.details);
    } catch (error) {
      toast.info("Server Error");
    }
    
  };
  return (
    <div className="search-results-container">
      {searchResults.map((user) => (
        <div
          onClick={() => handleAccessChat(user._id)}
          key={user._id}
          className="each-user-container"
        >
          <div className="search-results-user-picture">
            <img src={user.picture} alt="user-profile"></img>
          </div>
          <div className="search-results-name-email">
            <p>{user.name}</p>
            <p className="search-results-email">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

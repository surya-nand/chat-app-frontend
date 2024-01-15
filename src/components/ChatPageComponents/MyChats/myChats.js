import React, { useEffect, useState } from "react";
import "../MyChats/myChats.modules.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSkeleton from "../../../miscellaneous/loadingSkeleton";
import { useChat } from "../../../context/chatContext";
import {getSender}
 from "../../../miscellaneous/chatLogics";
import GroupChatModal from "../createGroupModal";

const BASE_URL = "http://localhost:5000";

const MyChats = () => {
  const { chats, setChats } = useChat();
  const [loading, setLoading] = useState(false);
  const { accessedChat, setAccessedChat } = useChat();
  const token = localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
  const handleChatSelect = (chat) => {
   setAccessedChat(chat)
  }
  const fetchChats = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`${BASE_URL}/api/chat`, config);
      setChats(response.data.chats);
      setLoading(false);
    } catch (error) {
      toast.error("Error occurred, try again");
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div className="my-chats">
      <div className="title-and-group-chat-container">
        <p>My Chats</p>
        <GroupChatModal>
          <button>New Group Chat +</button>
        </GroupChatModal>
      </div>
      <div className="loggedInUser-chats">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleChatSelect(chat)}
              className={`each-chat-container ${
                chat._id === accessedChat?._id ? "active" : ""
              }`}
            >
              <h1>
                {!chat.isGroupChat
                  ? getSender(loggedInUser, chat.users)
                  : chat.chatName}
              </h1>
              <p>{chat.latestMessage}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyChats;

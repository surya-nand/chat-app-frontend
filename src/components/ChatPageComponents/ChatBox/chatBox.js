import React, { useEffect, useState } from "react";
import "../ChatBox/chatBox.modules.css";
import { useChat } from "../../../context/chatContext";
import { InfoOutlineIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import UserInfoModal from "../userInfoModal";
import GroupChatUpdateModal from "../updateGroupChatModal";
import { getSender, getSenderInfo } from "../../../miscellaneous/chatLogics";
import MessageTab from "../../../miscellaneous/messageTab";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "https://chat-app-ky2m.onrender.com";

const ChatBox = () => {
  const { accessedChat, refreshChats, setRefreshChats } = useChat();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpenUserProfile = () => {
    setIsUserProfileOpen(true);
  };
  const token = localStorage.getItem("token");
  const handleMessageInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const fetchMessages = async () => {
    if (!accessedChat) return;
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/message/${accessedChat._id}`,
        config
      );
      setMessages(response.data.details);
      setRefreshChats('refreshAgain')
      setLoading(false);
    } catch (error) {
      toast.error("Error occurred");
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [accessedChat,refreshChats]);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };
      setNewMessage("");
      const response = await axios.post(
        `${BASE_URL}/api/message`,
        {
          content: newMessage,
          chatId: accessedChat,
        },
        config
      );
      const newMessageObject = response.data.details;
      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <>
      <div className="chat-box">
        {accessedChat ? (
          <>
            <div className="chat-name-container">
              <p>
                {accessedChat?.isGroupChat
                  ? accessedChat.chatName.toUpperCase()
                  : getSender(loggedInUser, accessedChat.users).toUpperCase()}
              </p>
              <button onClick={handleOpenUserProfile}>
                <InfoOutlineIcon />
              </button>
            </div>
            <div className="chat-arena">
              {loading ? (
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              ) : (
                <div className="messages-tab">
                  <MessageTab messages={messages}></MessageTab>
                </div>
              )}

              <form method="POST" onSubmit={handleSubmitMessage}>
                <div className="enter-message-area">
                  <input
                    placeholder="Enter a message"
                    value={newMessage}
                    onChange={handleMessageInputChange}
                  ></input>
                  <button type="submit">
                    <ChevronRightIcon />
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="chat-empty-message">
            <p>
              Don't feel shy
              <br />
              Click on a user to start texting
            </p>
          </div>
        )}
      </div>
      {isUserProfileOpen &&
        (accessedChat && !accessedChat.isGroupChat ? (
          <div>
            <UserInfoModal
              user={getSenderInfo(loggedInUser, accessedChat.users)}
              onClose={() => setIsUserProfileOpen(false)}
            ></UserInfoModal>
          </div>
        ) : (
          <GroupChatUpdateModal
            onClose={() => setIsUserProfileOpen(false)}
          ></GroupChatUpdateModal>
        ))}
    </>
  );
};

export default ChatBox;

import React, { useState } from "react";
import "../ChatBox/chatBox.modules.css";
import { useChat } from "../../../context/chatContext";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import UserProfileModal from "../UserProfileModal";

const ChatBox = () => {
  const { accessedChat } = useChat();
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const handleOpenUserProfile = () => {
    setIsUserProfileOpen(true);
  };
  console.log(accessedChat)
  return (
    <>
      <div className="chat-box">
        {accessedChat ? (
          <>
            <div className="chat-name-container">
              <p>{accessedChat.chatName}</p>
              <button onClick={handleOpenUserProfile}>
                <InfoOutlineIcon />
              </button>
            </div>

            <div className="chat-arena">
              <input placeholder="Enter a message"></input>
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
      {
        isUserProfileOpen && (
          <div>
            <UserProfileModal/>
          </div>
        )
      }
    </>
  );
};

export default ChatBox;

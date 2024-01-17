import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "./chatLogics";
import axios from "axios";
import { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import "./messageTab.modules.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "https://chat-app-ky2m.onrender.com";

const MessageTab = ({ messages }) => {
  const [clickedMessageId, setClickedMessageId] = useState(null);
  const [handleReactionUpdated, setHandleReactionUpdated] = useState(false)
  const [isReactionContainerOpen, setIsReactionContainerOpen] = useState(false);
  const [messageReactions, setMessageReactions] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("token");

  const fetchReactions = async () => {
    try {
      if(clickedMessageId){
        const config = {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get(
          `${BASE_URL}/api/message/reactions/${clickedMessageId}`,
          config
        );
        if (
          response.data.message === "Reactions count retrieved successfully"
        ) {
          setMessageReactions(response.data.details);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReactionClick = async (reaction, messageId) => {
    setHandleReactionUpdated((prev) => !prev)
    toast.info("You reacted!");
    try {
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        `${BASE_URL}/api/message/reactions`,
        {
          messageId: messageId,
          newReactionType: reaction,
        },
        config
      );
      console.log(response.data.updatedMessage)
      setIsReactionContainerOpen(false);
    } catch (error) {}
  };

  const handleMessageClick = (messageId) => {
    setClickedMessageId(messageId);
    setIsReactionContainerOpen(!isReactionContainerOpen);
  };
  useEffect(() => {
    fetchReactions();
  }, [clickedMessageId,handleReactionUpdated]);

  return (
    <ScrollableFeed>
      <div>
        {messages &&
          messages.map((message, index) => (
            <div
              style={{ display: "flex", position: "relative" }}
              key={message._id}
            >
              {(isSameSender(messages, message, index, user._id) ||
                isLastMessage(messages, index, user._id)) && (
                <Tooltip
                  label={message.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={message.sender.name}
                    src={message.sender.pic}
                  />
                </Tooltip>
              )}
              <span
                onClick={() => handleMessageClick(message._id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: `${
                    message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(
                    messages,
                    message,
                    index,
                    user._id
                  ),
                  marginTop: isSameUser(messages, message, index, user._id)
                    ? 5
                    : 10,
                  borderRadius: "10px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                }}
              >
                {message.content}
              </span>
              {isReactionContainerOpen &&
                (clickedMessageId === message._id ? (
                  <div className="reactions-container">
                    <span
                      role="img"
                      aria-label="Like"
                      onClick={() => handleReactionClick("like", message._id)}
                      style={{ cursor: "pointer", marginRight: "5px" }}
                    >
                      👍
                      {messageReactions &&
                        (messageReactions.like > 0
                          ? messageReactions.like
                          : "")}
                    </span>
                    <span
                      role="img"
                      aria-label="Love"
                      onClick={() => handleReactionClick("love", message._id)}
                      style={{ cursor: "pointer", marginRight: "5px" }}
                    >
                      ❤️
                      {messageReactions &&
                        (messageReactions.love > 0
                          ? messageReactions.love
                          : "")}
                    </span>
                    <span
                      role="img"
                      aria-label="Laugh"
                      onClick={() => handleReactionClick("laugh", message._id)}
                      style={{ cursor: "pointer" }}
                    >
                      😂
                      {messageReactions &&
                        (messageReactions.laugh > 0
                          ? messageReactions.laugh
                          : "")}
                    </span>
                  </div>
                ) : (
                  ""
                ))}
            </div>
          ))}
      </div>
    </ScrollableFeed>
  );
};

export default MessageTab;

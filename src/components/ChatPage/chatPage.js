import React from "react";
import '../ChatPage/chatPage.modules.css'
import Navbar from "../ChatPageComponents/Navbar/Navbar";
import MyChats from "../ChatPageComponents/MyChats/myChats";
import ChatBox from "../ChatPageComponents/ChatBox/chatBox";

function ChatPage() {
  return (
    <div id="chat-page">
      <>
        <div>
          <Navbar />
        </div>
        <div className="mychats-chatbox-container">
          <MyChats />
          <ChatBox />
        </div>
      </>
    </div>
  );
}

export default ChatPage;

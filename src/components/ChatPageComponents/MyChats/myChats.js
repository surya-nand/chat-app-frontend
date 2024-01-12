import React, { useEffect, useState } from "react";
import "../MyChats/myChats.modules.css";
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:5000";


const MyChats = () => {
  const [chats, setChats] = useState([])
  const loggedInUser = JSON.parse(localStorage.getItem('userInfo'))
  const token = localStorage.getItem("token");
  const fetchChats = async() => {
     try{
        const config = {
        headers: {
          Authorization: token,
      }
     }
     const response = await axios.get(`${BASE_URL}/api/chat`,config);
     setChats(response.data.chats)
  }
  catch(error){
    toast.error("Error occurred, try again")
  }
}
console.log(chats)

  useEffect(() => {
   fetchChats();
  },[])
  return (
    <div className="my-chats">
      <div className="title-and-group-chat-container">
        <p>My Chats</p>
        <button>New Group Chat +</button>
      </div>
      <div className="loggedInUser-chats">
        {
          chats.map((chat)=> (
            <div key={chat._id} className="each-chat-container">
              <h1>{chat.chatName}</h1>
              <p>{chat.latestMessage}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyChats;

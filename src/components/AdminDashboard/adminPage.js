import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../ChatPageComponents/Navbar/Navbar';
import UserList from '../AdminPageComponents/userList';
import CreateUser from '../AdminPageComponents/createUser';
import { useChat } from '../../context/chatContext';
const BASE_URL = "http://localhost:5000";

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const {refreshUsersList} = useChat();
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const token = localStorage.getItem("token")
  const fetchData = async() => {
    try{
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(`${BASE_URL}/api/users/fetch`,config)
      if(response.data.message === 'Fetched all users'){
        setUsers(response.data.details)
      }
      else{
        toast.error("Failed in fetching users")
      }
    }
    catch(error){
      if(error.response){
        toast.error(error.response.data.message)
      }
    }
  }
  useEffect(() => {
   fetchData()
  },[refreshUsersList]) 
  return (
    <div>
      <Navbar/>
      <CreateUser/>
      <UserList users={users}/>
    </div>
  )
}

export default AdminPage
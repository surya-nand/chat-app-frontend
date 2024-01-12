import { Button, Tooltip, useStatStyles } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useNavigate } from "react-router-dom";
import UserProfileModal from "./UserProfileModal";
import '../ChatPageComponents/navbar.modules.css'

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();
  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLogOutButton = () => {
    localStorage.setItem("userInfo", "");
    navigate('/')
  };
  return (
    <div className="navbar">
      <div className="search-user">
        <Tooltip
          bg={"black"}
          label="Search users to chat"
          hasArrow
          placement="bottom-end"
        >
          <button
            placeholder="Search user"
          >Search User</button>
        </Tooltip>
      </div>
      <div className="application-title">
        <h1>Chat Blast</h1>
      </div>
      <div className="user-notifications-profile">
        <BellIcon fontSize="2xl" m={1} />
        <Menu>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.name}
              src={user.pic}
            />
          </MenuButton>
          <MenuList>
            <UserProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>{" "}
            </UserProfileModal>
            <MenuDivider />
            <MenuItem onClick={handleLogOutButton}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;

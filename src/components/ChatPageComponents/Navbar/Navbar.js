import { Button, Tooltip } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import SearchResults from "../../../miscellaneous/searchResults";
import LoadingSkeleton from "../../../miscellaneous/loadingSkeleton";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserProfileModal from "../UserProfileModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Navbar/navbar.modules.css";

const BASE_URL = "http://localhost:5000";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isSearchContainerOpen, setIsSearchContainerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleOpenSearchContainer = () => {
    setIsSearchContainerOpen(true);
  };

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLogOutButton = () => {
    localStorage.setItem("userInfo", "");
    localStorage.setItem("token", "");
    navigate("/");
  };

  const handleCloseSearchContainer = () => {
    setIsSearchContainerOpen(false);
    setSearchResults([])
    setSearch("");
  };

  const handleFetchSearchResultsButtonClick = async () => {
    if (!search) {
      toast.error("Your search is empty");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/api/users?search=${search}`,
        config
      );
      setLoading(false);
      if ((response.data.message = "search successful")) {
        toast.info(`${response.data.userDetails.length} results found`);
        setSearchResults(response.data.userDetails);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {}
  };
  return (
    <>
      <div className="navbar">
        <div className="search-user">
          <Tooltip
            bg={"black"}
            label="Search users to chat"
            hasArrow
            placement="bottom-end"
          >
            <button onClick={handleOpenSearchContainer}>Search User</button>
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
      {isSearchContainerOpen && (
        <div className="search-container">
          <div className="search-container-title">
            <p className="search-title">Search Users</p>
            <p
              onClick={handleCloseSearchContainer}
              className="close-search-users"
            >
              x
            </p>
          </div>
          <div className="search-container-input-field">
            <input
              placeholder="Search user"
              value={search}
              onChange={handleSearchInputChange}
            ></input>
            <Button onClick={handleFetchSearchResultsButtonClick}>Go</Button>
          </div>
          <div className="search-results-field">

            {loading ? (<LoadingSkeleton/>) : <SearchResults searchResults={searchResults} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

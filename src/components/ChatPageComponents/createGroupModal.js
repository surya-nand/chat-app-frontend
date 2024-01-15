import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useChat } from "../../context/chatContext";
import GroupUserIcon from "../../miscellaneous/groupUserIcon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "http://localhost:5000";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { chats, setChats } = useChat();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      toast.info("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
      setSearchResult(response.data.userDetails);
    } catch (error) {
      toast.error("Error occurred, try again");
    }
  };

  const handleDelete = (deleteUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deleteUser._id));
  };

  const handleSubmit = async () => {
    if (!groupName || !selectedUsers) {
      toast.info("Please select at least 2 users and add group name ");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${BASE_URL}/api/chat/group`,
        {
          chatName: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([response.data.details, ...chats]);
      onClose();
      toast("Group chat created");
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.message)
      }
      else{
        toast.error("Error occurred")
      }
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Group Name"
                mb={3}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add min two users "
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <GroupUserIcon
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult?.slice(0, 3).map((user) => (
                <div
                  onClick={() => handleGroup(user)}
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
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;

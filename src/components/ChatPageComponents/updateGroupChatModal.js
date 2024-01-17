import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Box,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useChat } from "../../context/chatContext";
import GroupUserIcon from "../../miscellaneous/groupUserIcon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = "https://chat-app-ky2m.onrender.com";

const GroupChatUpdateModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { setRefreshChats } = useChat();
  const { accessedChat, setAccessedChat } = useChat();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("token");

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
      console.log(response.data);
      if ((response.data.message = "search successful")) {
        toast.info(`${response.data.userDetails.length} results found`);
        setSearchResult(response.data.userDetails);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.info("Error occurred, try again");
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/api/chat/group/rename`,
        {
          chatId: accessedChat?._id,
          chatName: groupName,
        },
        config
      );
      setAccessedChat(response.data.details);
      setRenameLoading(false);
      setRefreshChats("refresh");
    } catch (error) {
      toast.info("Error occurred, try again");
      setRenameLoading(false);
    }
    setGroupName("");
  };

  const handleAddUser = async (user1) => {
    if (accessedChat?.users.find((u) => u._id === user1._id)) {
      toast.error("User already in the group");
      return;
    }

    if (accessedChat?.groupAdmin._id !== user._id) {
      toast.error("Only admins can add user");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/api/chat/group/add`,
        {
          chatId: accessedChat?._id,
          userId: user1._id,
        },
        config
      );
      setAccessedChat(response.data.details);
      setLoading(false);
      setRefreshChats("refresh");
    } catch (error) {
      toast.error("Error occurred try again");
      setLoading(false);
    }
    setGroupName("");
  };

  const handleRemove = async (user1) => {
    if (accessedChat?.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast.info("Only admins can remove users");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/api/chat/group/remove`,
        {
          chatId: accessedChat?._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id
        ? setAccessedChat()
        : setAccessedChat(response.data.details);
      setLoading(false);
      setRefreshChats("refresh");
      setIsOpen(false);
    } catch (error) {
      toast.error("Error occurred");
      setLoading(false);
    }
    setGroupName("");
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {accessedChat?.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {accessedChat?.users.map((u) => (
                <GroupUserIcon
                  key={u._id}
                  user={u}
                  admin={accessedChat?.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder={accessedChat?.chatName}
                mb={3}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.slice(0, 3).map((user) => (
                <div
                  onClick={() => handleAddUser(user)}
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
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatUpdateModal;



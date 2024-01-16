import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";


const UserInfoModal = ({ user, onClose}) => {
   const isOpen = true;

  return (
    <>
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.picture}
              alt={user.name}
            />
            <Text fontSize={{ base: "28px", md: "30px" }}>
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
          >
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserInfoModal;
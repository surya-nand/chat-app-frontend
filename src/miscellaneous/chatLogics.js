const getSender = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id
    ? users[1].name.charAt(0).toUpperCase() + users[1].name.slice(1)
    : users[0].name.charAt(0).toUpperCase() + users[0].name.slice(1);
};

export default getSender;


const getSenderInfo = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id
    ? users[1]
    : users[0]
};

export { getSender, getSenderInfo };



const getSender = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id
    ? users[1].name.charAt(0).toUpperCase() + users[1].name.slice(1)
    : users[0].name.charAt(0).toUpperCase() + users[0].name.slice(1);
};


const getSenderInfo = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id
    ? users[1]
    : users[0]
};

const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};
const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export { getSender, getSenderInfo, isLastMessage, isSameSender, isSameSenderMargin, isSameUser };



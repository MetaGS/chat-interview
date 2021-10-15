import { useEffect, useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./Chat.css";

const initialState = [
  {
    name: "John",
    id: 121324125,
    messages: [
      {
        sender: "me",
        text: "Hi bro!",
        time: new Date().getTime(),
        messageId: new Date().getDate() + 3415,
      },
    ],
  },
  {
    name: "Sten",
    id: 12132412123,
    messages: [
      {
        sender: "me",
        text: "what up maan!",
        time: new Date().getTime(),
        messageId: new Date().getDate() + 21341,
      },
    ],
  },
  {
    name: "Alfred",
    id: 121322134125,
    messages: [
      {
        sender: "me",
        text: "I love you!",
        time: new Date().getTime(),
        messageId: new Date().getDate() + 1235,
      },
    ],
  },
  {
    name: "Salt",
    id: 1213244132125,
    messages: [
      {
        sender: "me",
        text: "let go to cinema tomorrow!",
        time: new Date().getTime(),
        messageId: new Date().getDate() + 21325,
      },
      {
        sender: "friend",
        text: "Sure why not bro!",
        time: new Date().getTime(),
        messageId: new Date().getDate() + 234,
      },
    ],
  },
];

function App() {
  const [chatUsers, setChatUsers] = useState(initialState);
  const [currentFriendId, setCurrentFriendId] = useState(121322134125);
  const currentUserObject = useMemo(
    () => chatUsers.find((user) => user.id === currentFriendId),
    [currentFriendId, chatUsers]
  );

  useEffect(() => {}, [currentFriendId]);

  const onMessageSend = (currentMessage) => {
    const newMessage = {
      sender: "me",
      text: currentMessage,
      time: new Date().getTime(),
      messageId: currentFriendId + new Date().getTime() + "message",
    };

    setChatUsers([
      { ...currentUserObject, messages: [...currentUserObject.messages, newMessage] },
      ...chatUsers.filter((user) => user.id !== currentUserObject.id),
    ]);
  };

  const onFriendClick = (friendId) => () => setCurrentFriendId(friendId);
  return (
    <div className="App">
      <header className="App-header">Chat App</header>
      <section className="chat-section">
        <div className="left-bar">
          <FriendsList
            onFriendClick={onFriendClick}
            friends={chatUsers}
            selectedUser={currentUserObject}
          />
        </div>
        <div className="chat">
          <h3>{currentUserObject.name}</h3>
          <ChatMessages
            currentFriendId={currentFriendId}
            currentFriend={currentUserObject}
          />
          <WriteMessage onMessageSend={onMessageSend} />
        </div>
      </section>
    </div>
  );
}

const ChatMessages = (props) => {
  return (
    <ul className="chat-messages">
      {props.currentFriend.messages.map((message) => {
        const time = new Date(message.time);
        return (
          <li key={message.messageId} className={message.sender}>
            <p>{message.text}</p>
            <span>{`${time.getHours()}:${time.getMinutes()}`}</span>
          </li>
        );
      })}
    </ul>
  );
};

const FriendsList = (props) => {
  return (
    <ul className="friend-list">
      {props.friends.map((friendObject) => {
        return (
          <li
            key={friendObject.id}
            className={`friend-list__item ${
              friendObject.id === props.selectedUser.id && "selected"
            }`}
          >
            <button onClick={props.onFriendClick(friendObject.id)}>
              {friendObject.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const WriteMessage = (props) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const onCurrentMessageChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const onMessageSend = () => {
    props.onMessageSend(currentMessage);

    setCurrentMessage("");
  };

  const onEnter = (e) => {
    if (e.code === "Enter") {
      onMessageSend();
    }
  };
  return (
    <div className="send-message">
      <input
        type="text"
        className="send-message__input"
        value={currentMessage}
        onChange={onCurrentMessageChange}
        onKeyPress={onEnter}
      />
      <button onClick={onMessageSend}>SEND</button>
    </div>
  );
};

export default App;

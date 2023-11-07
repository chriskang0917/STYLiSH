import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AuthContext } from "../../context/authContext";
import { socket } from "../../utils/socket";
import profile from "./profile.png";
const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px 30px;
  border: 1px solid #ccc;
  background-image: url(${profile});
  background-position: center center;
`;

const AdminAvatar = styled.div`
  width: 60px;
  height: 60px;
  padding-top: 20px;
  text-align: center;
  letter-spacing: 2px;
  border-radius: 50%;
  margin: 20px 30px;
  border: 1px solid #ccc;
`;

const Header = styled.p`
  font-size: 20px;
  text-align: center;

  margin: 20px auto;
  color: #3f3a3a;
`;
const fadeIn = keyframes`
from {
opacity: 0;
z-index:-4
}
to {
opacity: 1;
z-index:-4
}
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 550px;
  margin: 10px auto;
  border: 1px solid #313538;
  border-radius: 8px;
  justify-content: center;
  position: relative;
  background-color: #fff;

  &:before,
  &:after {
    content: "";
    border: solid transparent;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
  }
  &:after {
    border-width: 10px 10px 0 10px;
    border-top-color: #fff;
    top: 548px;
    right: 38px;
  }
  &:before {
    border-width: 12px 12px 0 12px;
    border-top-color: #313538;
    position: absolute;
    top: 548px;
    right: 36px;
  }

  opacity: 0;

  animation: ${fadeIn} 0.3s ease-in-out forwards;
`;

const Message = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0px;
  background-color: #313538;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    right: -1;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-left-color: #313538;
    border-right: 0;
    border-top: 0;
    margin-top: -10px;
    margin-right: -20px;
  }
`;
const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
`;
const ChatMessages = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
`;

const ChatInput = styled.input`
  width: 70%;
  padding: 8px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ccc;
  &:placeholder {
    color: #fff;
  }
`;

const SendButton = styled.button`
  width: 15%;
  background-color: #313538;
  color: #fff;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 10px;
`;
const SendArea = styled.form`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
`;
const Line = styled.div`
  width: 300px;
  height: 2px;
  background-color: #ccc;
  margin: auto auto;
`;

const LoginButton = styled.button`
  width: 150px;
  height: 50px;
  position: relative;
  left: calc(50% - 75px);
  letter-spacing: 2px;
  background-color: #313538;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;

function Chat() {
  const { isLogin } = useContext(AuthContext);

  const listRef = useRef([]);
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getSortedHistory = (messages) => {
      return [...messages].sort((a, b) => a.sendTime - b.sendTime);
    };

    const initChatHistory = async () => {
      const { data: chatHistory } = await api.getChatHistory();
      const messageHistories = getSortedHistory(chatHistory);
      setMessages((prevMessages) => [...prevMessages, ...messageHistories]);

      socket.connect("user");
      socket.receive(setMessages);
    };

    initChatHistory();
  }, []);

  useEffect(() => {
    const lastMessage = listRef.current[messages.length - 1];
    lastMessage?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages.length]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { content: newMessage, isUser: true, sendTime: Date.now() },
    ]);
    setNewMessage("");
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <ChatContainer>
      <Header>客 服 聊 聊</Header>
      {isLogin ? (
        <>
          <Line />
          <ChatMessages>
            {messages.map(({ content, isUser }, index) => (
              <div
                key={index}
                ref={(element) => (listRef.current[index] = element)}>
                <MessageContainer key={index}>
                  <Message>{content}</Message>
                  {!isUser && <AdminAvatar>客服</AdminAvatar>}
                  {isUser && <Avatar />}
                </MessageContainer>
              </div>
            ))}
          </ChatMessages>
          <SendArea>
            <ChatInput
              type="text"
              placeholder="請輸入訊息"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              ref={inputRef}
            />
            <SendButton
              onClick={(event) => {
                handleSendMessage(event);
                handleFocus();
              }}>
              送出
            </SendButton>
          </SendArea>
        </>
      ) : (
        <Link to="/profile">
          <LoginButton>請先登入再詢問</LoginButton>
        </Link>
      )}
    </ChatContainer>
  );
}

export default Chat;

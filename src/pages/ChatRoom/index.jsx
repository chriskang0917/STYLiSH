import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
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
  justify-centent: center;
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
const SendArea = styled.div`
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

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { text: newMessage, user: "user" }]);
    setNewMessage("");
  };
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    //即時聊天
  }, []);

  return (
    <ChatContainer>
      <Header>客 服 聊 聊</Header>
      <Line />
      <ChatMessages>
        {messages.map((message, index) => (
          <MessageContainer key={index}>
            <Message>{message.text}</Message>
            <Avatar />
          </MessageContainer>
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
          onClick={() => {
            handleSendMessage();
            handleFocus();
          }}
        >
          送出
        </SendButton>
      </SendArea>
    </ChatContainer>
  );
}

export default Chat;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { socket } from "../../utils/socket";
import profile from "./profile.png";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 50vh;
  margin: 5vh auto 10vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  justify-content: center;
`;

const ChatHeader = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  margin: 30px auto;
  color: #3f3a3a;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 50px;
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

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 20px 30px;
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

const ChatInput = styled.input`
  width: 60%;
  padding: 8px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ccc;
  &:placeholder {
    color: #fff;
  }
`;

const SendButton = styled.button`
  width: 10%;
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

function ChatAdmin() {
  const listRef = useRef([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.connect("admin");
    socket.receive(setMessages);
  }, []);

  useEffect(() => {
    const lastMessage = listRef.current[messages.length - 1];
    lastMessage?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [newMessage]);

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (newMessage.trim() === "") return;

    socket.send(newMessage);

    setMessages([
      ...messages,
      { content: newMessage, isUser: false, sendTime: Date.now() },
    ]);
    setNewMessage("");
  };

  return (
    <>
      <ChatHeader>客服聊天室</ChatHeader>
      <ChatContainer>
        <ChatMessages>
          {messages.map(({ content, isUser }, index) => (
            <div
              key={index}
              ref={(element) => (listRef.current[index] = element)}>
              <MessageContainer>
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
          />
          <SendButton onClick={handleSendMessage}>送出</SendButton>
        </SendArea>
      </ChatContainer>
    </>
  );
}

export default ChatAdmin;

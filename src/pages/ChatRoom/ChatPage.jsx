import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import api from "../../utils/api";
import { socket } from "../../utils/socket";
import profile from "./profile.png";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 60vh;
  margin: 4vh auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  justify-content: center;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
`;

const Header = styled.h1`
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  margin: 20px auto 0;
  color: #3f3a3a;
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

const LoginButton = styled.button`
  width: 150px;
  height: 50px;
  position: relative;
  left: calc(50% - 75px);
  top: calc(50% - 25px);
  letter-spacing: 2px;
  background-color: #313538;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10px;
`;

const Warning = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: #988f8f;
`;

function Chat() {
  const listRef = useRef([]);
  const { isLogin } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAdminExist, setIsAdminExist] = useState(false);

  useEffect(() => {
    const getSortedHistory = (messages) => {
      return [...messages].sort((a, b) => a.sendTime - b.sendTime);
    };

    const initChatHistory = async () => {
      const { data: chatHistory } = (await api.getChatHistory()) || {
        data: [],
      };
      const sortedHistory = getSortedHistory(chatHistory);
      setMessages((prevMessages) => [...prevMessages, ...sortedHistory]);

      socket.connect("user");
      socket.receive(setMessages, setIsAdminExist);
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

    socket.send(newMessage);

    setMessages([
      ...messages,
      { content: newMessage, isUser: true, sendTime: Date.now() },
    ]);
    setNewMessage("");
  };

  return (
    <>
      <Header>客 服 聊 聊</Header>
      {isAdminExist ? (
        <Warning>客服已上線，請開始對話。</Warning>
      ) : (
        <Warning>目前客服尚未上線，請於服務時間再來。</Warning>
      )}
      <ChatContainer>
        <ChatMessages>
          {isLogin ? (
            messages.map(({ content, isUser }, index) => (
              <div
                key={index}
                ref={(element) => (listRef.current[index] = element)}>
                <MessageContainer>
                  <Message>{content}</Message>
                  {!isUser && <AdminAvatar>客服</AdminAvatar>}
                  {isUser && <Avatar />}
                </MessageContainer>
              </div>
            ))
          ) : (
            <Link to="/profile">
              <LoginButton>請先登入再詢問</LoginButton>
            </Link>
          )}
        </ChatMessages>
        {isLogin && (
          <SendArea>
            <ChatInput
              type="text"
              placeholder="請輸入訊息"
              value={newMessage}
              disabled={!isAdminExist}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <SendButton onClick={handleSendMessage} disabled={!isAdminExist}>
              送出
            </SendButton>
          </SendArea>
        )}
      </ChatContainer>
    </>
  );
}

export default Chat;

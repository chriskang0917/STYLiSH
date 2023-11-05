import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ChatRoom from "../../pages/ChatRoom";
import chat from "./chat.png";
const Container = styled.div`
  position: relative;
`;
const PageLink = styled(Link)`
  @media screen and (max-width: 1279px) {
    width: 80%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & + & {
    margin-left: 42px;

    @media screen and (max-width: 1279px) {
      margin-left: 0;
    }
  }

  & + &::before {
    @media screen and (max-width: 1279px) {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 24px;
      margin: 10px 51px 10px 0;
      background-color: #828282;
    }
  }
`;

const PageLinkIcon = styled.div`
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-size: contain;

  border-radius: 50%;
  background-color: #8b572a;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
`;
const fadeIn = keyframes`
from {
opacity: 0;
}
to {
opacity: 1;
}
`;
const ChatIcon = styled(PageLinkIcon)`
  background-image: url(${chat});

  background-position: center center;
`;
const ChatContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -2;
  display: block;
  @media screen and (max-width: 1279px) {
    ${(props) => props.hideOnMobile && "display: none;"}
  }
`;

function Chat() {
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1279);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1279);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      {isMobile ? (
        <Link to="/chatpage">
          <ChatIcon icon={chat} />
        </Link>
      ) : (
        <div className={` ${isChatOpen ? "open" : ""}`} onClick={toggleChat}>
          <ChatIcon icon={chat} />
        </div>
      )}
      {isChatOpen && (
        <>
          <ChatContainer style={{ top: "-580px", left: "-300px" }}>
            <ChatRoom />
          </ChatContainer>
        </>
      )}
    </Container>
  );
}

export default Chat;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import chat from "./chat.png";
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
  position: relative;
  border-radius: 50%;
  background-color: #8b572a;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
`;

const ChatIcon = styled(PageLinkIcon)`
  background-image: url(${chat});
  background-position: center center;
`;
function Chat() {
  return (
    
      <PageLink to="/chatroom">
        <ChatIcon icon={chat} />
      </PageLink>
  
  );
}

export default Chat;

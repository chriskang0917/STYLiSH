import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import Chat from "./components/Chat";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { AuthContextProvider } from "./context/authContext";
import { CartContextProvider } from "./context/cartContext";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans TC', sans-serif;
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;
const ChatContainer = styled.div`
  position: fixed;
  bottom: 90px;
  right: 90px;
  z-index: 999;
`;

function App() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <>
      <Reset />
      <GlobalStyle />
      <AuthContextProvider>
        <CartContextProvider>
          <Header />
          <Outlet />
          {pathName !== "/chatpage" && pathName !== "/admin/chat" && (
            <ChatContainer>
              <Chat />
            </ChatContainer>
          )}

          <Footer />
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;

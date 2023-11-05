import { io } from "socket.io-client";

class Socket {
  constructor(endpoint) {
    this.isUser = true;
    this.socket = io(endpoint);
  }

  receive(setMessage) {
    this.socket.on("talk", (message) => {
      setMessage(message);
    });
  }

  send(message) {
    const jwtToken = localStorage.getItem("jwtToken");
    const identity = this.isUser ? "user" : "admin";
    const userIdentity = [identity, this.socket.id, jwtToken];

    this.socket.emit("talk", message, userIdentity);
  }

  disconnect() {
    this.socket.disconnect();
  }

  isAdmin() {
    this.isUser = false;
  }
}

const host = "http://13.55.105.122:3000/";
export const socket = new Socket(host);

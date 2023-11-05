import { io } from "socket.io-client";

export class Socket {
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

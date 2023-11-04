import { io } from "socket.io-client";

const host = "http://13.55.105.122:3000/";
const socketIO = io(host);

export const socket = {
  isUser: true,
  receive(setMessage) {
    socketIO.on("talk", (message) => {
      setMessage(message);
    });
  },
  send(message) {
    const jwtToken = localStorage.getItem("jwtToken");
    const identity = this.isUser ? "user" : "admin";
    const userIdentity = [identity, socketIO.id, jwtToken];

    socketIO.emit("talk", message, userIdentity);
  },
  disconnect() {
    socketIO.disconnect();
  },
  isAdmin() {
    this.isUser = false;
  },
};

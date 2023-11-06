import { io } from "socket.io-client";

class Socket {
  constructor(hostName) {
    this.socket = io(hostName);
    this.jwtToken = localStorage.getItem("jwtToken") || undefined;
  }

  connect(identity = "user") {
    this.user = identity;

    const userIdentity = [identity, this.jwtToken];
    this.socket.emit("user-check", userIdentity);
  }

  receive(setMessage) {
    this.socket.on("talk", (message) => {
      setMessage((prevMessages) => [...prevMessages, message]);
    });
    this.socket.on("user-check", (user) => {
      console.log("user-check: ", user);
    });
  }

  send(message) {
    const userIdentity = [this.user, this.jwtToken];
    this.socket.emit("talk", message, userIdentity);
  }
}

const hostName = "https://deercodeweb.com/";
export const socket = new Socket(hostName);

import { io } from "socket.io-client";

export class Socket {
  constructor(hostName) {
    this.socket = io(hostName);
    this.jwtToken = localStorage.getItem("jwtToken") || undefined;
  }

  connect(identity) {
    this.user = identity;

    const userIdentity = [identity, this.jwtToken];
    this.socket.emit("user-check", userIdentity);
  }

  receive(setMessage) {
    this.socket.on("talk", (message) => {
      setMessage(message);
    });
  }

  send(message) {
    const userIdentity = [this.user, this.jwtToken];
    this.socket.emit("talk", message, userIdentity);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

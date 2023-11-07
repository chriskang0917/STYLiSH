import { io } from "socket.io-client";

class Socket {
  constructor(hostName) {
    this.socket = io(hostName);
    this.jwtToken = localStorage.getItem("jwtToken") || undefined;
  }

  connect(identity = "user") {
    this.user = identity;

    const adminJwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM3LCJpYXQiOjE2OTkzMzE1NzEsImV4cCI6MTcwNDUxNTU3MX0.lQ5LgKSHzx9lls3pluzdqoyvN890Zaf2kQuKtIf6uMA";

    let userIdentity;
    if (identity === "admin") userIdentity = [identity, adminJwtToken];
    if (identity === "user") userIdentity = [identity, this.jwtToken];

    this.socket.emit("user-check", userIdentity);
  }

  receive(setMessage, setJwtToken) {
    this.socket.on("talk", (message) => {
      setMessage((prevMessages) => [...prevMessages, message]);
    });
    this.socket.on("user-check", (checkMessage) => {
      console.log("user-check: ", checkMessage);
      if (checkMessage[0] === "Notice admin user connect") {
        // checkMessage = ["Notice admin user connect", "user connect", jwtToken]
        setJwtToken(checkMessage[2]);
      }
    });
  }

  send(message) {
    const userIdentity = [this.user, this.jwtToken];
    this.socket.emit("talk", message, userIdentity);
  }

  disconnect() {
    this.socket.emit("user-close");
  }
}

const hostName = "https://handsomelai.shop/";
export const socket = new Socket(hostName);

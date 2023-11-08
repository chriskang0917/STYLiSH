import { io } from "socket.io-client";

class Socket {
  constructor(hostName) {
    this.adminJwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwLCJpYXQiOjE2OTk0NDAxMDgsImV4cCI6MTcwNDYyNDEwOH0.qO9BQieYiDFpgxwjtf9enM9IvP6WeLCHSP5JyOOnnLQ";
    this.socket = io(hostName);
    this.jwtToken = localStorage.getItem("jwtToken") || undefined;
  }

  connect(identity = "user") {
    this.user = identity;

    let userIdentity;
    if (identity === "admin") userIdentity = [identity, this.adminJwtToken];
    if (identity === "user") userIdentity = [identity, this.jwtToken];

    this.socket.emit("user-check", userIdentity);
  }

  receive(setMessage, setResponse) {
    this.socket.on("user-check", (checkMessage) => {
      console.log("user-check: ", checkMessage);

      if (this.user === "admin") {
        if (checkMessage[0] === "Notice admin user connect") {
          setResponse(checkMessage[2]);
        }
        if (checkMessage[0] === "Disconnect") {
          setResponse("");
        }
      }
      if (this.user === "user") {
        if (checkMessage[1] === "All admin is offline.") {
          setResponse(false);
        }
        if (checkMessage[0] === "Disconnect") {
          setResponse(false);
        }
        if (checkMessage[1] === "user connect") {
          setResponse(true);
        }
      }
    });
    this.socket.on("talk", (message) => {
      setMessage((prevMessages) => [...prevMessages, message]);
    });
  }

  send(message) {
    if (this.user === "admin") {
      const adminIdentity = [this.user, this.adminJwtToken];
      this.socket.emit("talk", message, adminIdentity);
      return;
    }
    if (this.user === "user") {
      const userIdentity = [this.user, this.jwtToken];
      this.socket.emit("talk", message, userIdentity);
    }
  }

  disconnect() {
    this.socket.emit("user-close");
  }
}

const hostName = "https://handsomelai.shop/";
export const socket = new Socket(hostName);

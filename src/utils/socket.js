import { io } from "socket.io-client";

const host = "http://13.55.105.122:3000/";
const socketIO = io(host);

/* Socket usage

onSnapshot: Put onSnapshot in useEffect to listen to new messages
socket.onSnapshot((data) => {
  setMessages((prevMessages) => [...prevMessages, data]);
});

send: Put send in onSubmit handler to send a message
socket.send(input);
setMessages((prevMessages) => [...prevMessages, input]);

isAdmin: Call isAdmin before onSnapshot to change identity to admin
socket.isAdmin();
socket.onSnapshot()...

*/

export const socket = {
  isUser: true,
  onSnapshot(setMessage) {
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
  isAdmin() {
    this.isUser = false;
  },
};

/*
  Proof of conept
*/

const socket = new WebSocket("ws://192.168.1.3/state");

// WebSocket event handlers
socket.onopen = () => {
  console.log("WebSocket connection established");
  
};

socket.onmessage = (event) => {
  const message = event.data;
  console.log("Received message:", message);
  
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
  
};

function sendMessage() {
  const message = "Hello, server!";
  socket.send(message);
  console.log("Sent message:", message);
}

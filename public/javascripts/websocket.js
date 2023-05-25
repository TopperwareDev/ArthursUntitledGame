const socket = new WebSocket("ws://192.168.1.3/state");

// WebSocket event handlers
socket.onopen = () => {
  console.log("WebSocket connection established");
  // You can send any initial messages or perform actions here
};

socket.onmessage = (event) => {
  const message = event.data;
  console.log("Received message:", message);
  // Handle incoming WebSocket messages here
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
  // Handle WebSocket connection closure here
};

// Example of sending a message to the server
function sendMessage() {
  const message = "Hello, server!";
  socket.send(message);
  console.log("Sent message:", message);
}

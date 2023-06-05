function websocketconnect(onConnect, onDissconnect) {
  const url = `ws:${window.location.host}/network/websocket`;
  const websocket = new WebSocket(url);
  
  websocket.onopen = () => {
    console.log("WebSocket connection established");
    onConnect(websocket);
  };

  websocket.onclose = () => {
    console.log("WebSocket connection closed");
    onDissconnect();
  };

  // websocket.onmessage = (event) => {
  //   const message = event.data;
  //   console.log("Received message:", message);
  // };

  // function sendMessage() {
  //   const message = "Hello, server!";
  //   socket.send(message);
  //   console.log("Sent message:", message);
  // }
}

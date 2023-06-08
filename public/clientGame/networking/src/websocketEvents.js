export function websocketconnect(onConnect, onDissconnect, onMessage) {
  const url = `ws:${window.location.host}/network/websocket`;
  const websocket = new WebSocket(url);
  
  websocket.onopen = () => {
    onConnect(websocket);
  };

  websocket.onclose = () => {
    onDissconnect();
  };

  websocket.onmessage = (event) => {
    const message = event.data;
    onMessage(message);
  };

  // function sendMessage() {
  //   const message = "Hello, server!";
  //   socket.send(message);
  //   console.log("Sent message:", message);
  // }
}

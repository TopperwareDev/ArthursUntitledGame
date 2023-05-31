const WebSocket = require("ws");

function upgrade(req) {
  const upgradePromise = new Promise((resolve, reject) => {
    if (
      req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() === "websocket" &&
      req.headers.connection &&
      req.headers.connection.toLowerCase() === "upgrade"
    ) {
      const wss = new WebSocket.Server({ noServer: true });
      wss.on("connection", function connection(ws) {
        resolve(ws);
      });
      wss.handleUpgrade(req, req.socket, Buffer.alloc(0), function done(ws) {
        wss.emit("connection", ws, req);
      });
    } else {
      reject();
    }
  });

  return upgradePromise;
}

module.exports = { upgrade };

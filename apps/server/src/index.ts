import http from "http";
import SocketService from "./service/socket";

async function init() {
  const httpServer = http.createServer();
  const socketService = new SocketService();

  const PORT = process.env.PORT || 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server is listening on - ${PORT}`);
  });
}

init();

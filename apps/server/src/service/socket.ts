import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    const io = this._io;

    console.log("Init socket listeners.");
    io.on("connect", async (socket) => {
      console.log(`New Socket connected - ${socket.id}.`);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message recieved.", message);
      });
    });
  }
}

export default SocketService;

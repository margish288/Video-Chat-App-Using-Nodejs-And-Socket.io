import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: process.env.REDIS_HOST || "",
  port: (process.env.REDIS_PORT || 23779) as any,
  username: process.env.REDIS_USERNAME || "",
  password: process.env.REDIS_PASSWORD || "",
});
const sub = new Redis({
  host: process.env.REDIS_HOST || "",
  port: (process.env.REDIS_PORT || 23779) as any,
  username: process.env.REDIS_USERNAME || "",
  password: process.env.REDIS_PASSWORD || "",
});
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

    sub.subscribe("Messages");
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
        await pub.publish("Messages", JSON.stringify(message));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "Messages") {
        io.emit("message", message);
      }
    });
  }
}

export default SocketService;

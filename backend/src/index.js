import express from "express";
import cors from "cors";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import chokidar from "chokidar";
import path from "path";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";
import { handleContainerCreate } from "./container/handleContainerCreate.js";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/api", apiRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/ping", (req, res) => {
  return res.status(200).json({
    message: "Pong",
    success: true,
  });
});

// app.listen(PORT , ()=>{
//     console.log(`Server is running on PORT ${PORT}`);
// })

const editorNamespace = io.of("/editor");
editorNamespace.on("connection", (socket) => {
  console.log("editor namespace connected");


  // console.log("socket.handshake.query: ", socket.handshake.query['projectId']);
 let projectId = socket.handshake.query['projectId'];
  if (projectId) {
    var wathcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes("node_modules"),
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
      },
      ignoreInitial: true,
    });

    wathcher.on("all", (event, path) => {
      console.log(event, path);
    });
  }
  handleEditorSocketEvents(socket , editorNamespace);

  socket.on("message", (data) => {
    console.log("message received from client: ", data);
  });

 
  socket.on("disconnect", async (data) => {
    await wathcher.close();
    console.log("editor namespace disconnected");
  });
});



 

server.listen(PORT, () => {
  console.log("server running at http://localhost:3000");
});

const webSocketForTerminal = new WebSocketServer({
  noServer: true // we will handle the upgrade manually
});
//server triggers upgrade event
server.on("upgrade" , (req , socket , head)=>{
//callback to be called when a client tries to connect through websocket
/**
 * req:incoming request object
 * socket: TCP socket
 * head: buffer containing the first packet of the message
 */
//make namespace for terminal

const isTerminal = req.url.includes("/terminal");
if(isTerminal){
  console.log(req.url, `project id is ${req.url.split("=")[1]}`);
}
});

webSocketForTerminal.on("connection",()=>{
  console.log("websocket for terminal connected");
})
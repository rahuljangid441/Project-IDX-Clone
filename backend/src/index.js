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


const terminalNamespace = io.of("/terminal");
terminalNamespace.on("connection" ,(socket)=>{
  console.log("terminal namespace connected", socket.id);

   let projectId = socket.handshake.query['projectId'];

 
 socket.on("shell-input",(data)=>{
    console.log("shell input received: ", data);
    terminalNamespace.emit("shell-output" ,data)
  })

  socket.on("disconnect" ,  ()=>{
    console.log("terminal namespace disconnected");
  });

  handleContainerCreate(projectId , socket);
})
server.listen(PORT, () => {
  console.log("server running at http://localhost:3000");
});

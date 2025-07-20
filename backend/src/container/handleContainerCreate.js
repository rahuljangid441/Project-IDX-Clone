import Docker from "dockerode";
const docker = new Docker();


export const listContainers = async ()=>{
    const containers = await docker.listContainers();
    console.log("Containers: ", containers);
    containers.forEach((containerInfo)=>{
        console.log(`Container Port is ${containerInfo.Ports[0].PublicPort}`);
    })
}
export const handleContainerCreate = async (projectId, terminalSocket,req , tcpSocket,head) => {
  console.log("Creating container for projectId: ", projectId);
  try {
    const container = await docker.createContainer({
      Image: "sandbox",
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      Cmd: ["/bin/sh"],
      User: "sandbox",
      Volumes:{
        "/home/sandbox/app": {},
      },
      
      ExposedPorts: {
        "5173/tcp": {},
      },
      Env: ["HOST=0.0.0.0"],
      HostConfig: {
        Binds: [`${process.cwd()}/projects/${projectId}:/home/sandbox/app`],
        PortBindings: {
        "5173/tcp": [
          {
            HostPort: "0",
          },
        ],
      },
      },
    });

    console.log("Container created with ID: ", container.id);
    await container.start();
    console.log("Container started successfully");

    //below is the place where we upgrade the connection to websocket
    terminalSocket.handleUpgrade(req , tcpSocket,head ,(establishedWSConn)=>{
        terminalSocket.emit("connection",establishedWSConn ,req , container);
    });



    
  } catch (error) {
    console.error("Error creating container: ", error);
  }
};

import Docker from "dockerode";
const docker = new Docker();

export const handleContainerCreate = async(projectId , socket)=>{
    console.log("Creating container for projectId: ", projectId);
    try{
        const container = await docker.createContainer({
            Image: "sandbox",
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true,
            CMD: ["/bin/sh"],
            User: "sandbox",
            HostConfig: {
                Binds: [
                    `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
                ],
                PortBindings:{
                    "5173/tcp":[
                        {
                        "HostPort": "0"
                    }
                    ]
                },
                ExposedPorts: {
                    "5173/tcp": {}
                },
                Env:["HOST=0.0.0.0"]
            }
        });

        console.log("Container created with ID: ", container.id);
        await container.start();
        console.log("Container started successfully");

        container.exec({
            Cmd: ["/bin/sh"],
            User: "sandbox",
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
        } , (err , exec)=>{
            if (err) {
                console.error("Error creating exec instance: ", err);
               return;
            }

        

            exec.start({ hijack: true},(err,stream)=>{
                if(err){
                    console.error("Error starting exec instance: ", err);
                    return;

                }

                processStream(stream, socket);
                   

                socket.on("shell-input" , (data)=>{
                    console.log("Shell input received FRONTEND: ", data);
                    stream.write("pwd\n" , (err)=>{
                        if(err){
                            console.error("Error writing to stream: ", err);
                        }
                        else{
                            console.log("Data written to stream successfully");
                        }
                    });
                })
            })
        })
    }catch (error) {
        console.error("Error creating container: ", error);
    }
}

function processStream(stream , socket){
    let buffer = Buffer.from("");
    stream.on("data",(data)=>{
        buffer = Buffer.concat([buffer, data]);
        console.log("Stream data: ", buffer.toString());
        socket.emit("shell-output", buffer.toString());
        buffer = Buffer.from("");
    });

    stream.on("end", () => {
        console.log("Stream ended");
        socket.emit("shell-output", "Stream ended");
    });
    stream.on("error", (err) => {
        console.error("Stream error: ", err);
        socket.emit("shell-output", "Stream error");
    });
}
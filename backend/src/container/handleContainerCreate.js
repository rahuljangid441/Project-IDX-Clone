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
    }catch (error) {
        console.error("Error creating container: ", error);
    }
}
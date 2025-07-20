export const handleTerminalCreation = async (container, ws) => {
  container.exec(
    {
      Cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      User: "sandbox",
    },
    (err, exec) => {
      if (err) {
        console.error("Error creating exec instance: ", err);
        return;
      }

      exec.start(
        {
          hijack: true,
        },
        (err, stream) => {
          if (err) {
            console.error("Error starting exec instance: ", err);
            return;
          }

          //step1: process streams
          processStreamOutput(stream, ws);
          //step2: write in streams

          ws.on("message", (data) => {
            if (data === "getPort") {
              ws.on("getPort", () => {
                console.log("getPort event received");
                container.inspect((err , data)=>{
                    const port = data.NetworkSettings;
                    console.log("Port data: ", port);
                })
              });
            }
            stream.write(data);
          });
        }
      );
    }
  );
};

function processStreamOutput(stream, ws) {
  let nextDataType = null;
  let nextDataLength = null;

  let buffer = Buffer.from("");

  function processStreamData(data) {
    if (data) {
      buffer = Buffer.concat([buffer, data]);
    }

    if (!nextDataType) {
      if (buffer.length >= 8) {
        const header = bufferSlicer(8);
        nextDataType = header.readUInt32BE(0);
        nextDataLength = header.readUInt32BE(4);

        processStreamData(); //recursive call to process the message
      }
    } else {
      if (buffer.length >= nextDataLength) {
        const content = bufferSlicer(nextDataLength);
        ws.send(content);
        nextDataType = null;
        processStreamData();
      }
    }
  }

  function bufferSlicer(end) {
    const output = buffer.slice(0, end); //header of the chuunk
    buffer = Buffer.from(buffer.slice(end, buffer.length)); //remaining buffer(part of the chunk);
    return output;
  }

  stream.on("data", processStreamData);
}

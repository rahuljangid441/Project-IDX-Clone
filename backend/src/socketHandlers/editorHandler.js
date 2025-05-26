import fs from "fs/promises";


export const handleEditorSocketEvents = (socket) => {

    socket.on("writeFile" , async({data , pathToFileOrFolder})=>{
        try{
            const response = await fs.writeFile(pathToFileOrFolder, data);
            socket.emit("writeFileSuccess", {
                data: "File written successfully"
            })
        }
        catch (error){
            console.error("Error writing file:", error);
            socket.emit("writeFileError", {
                error: "Failed to write file"
            });
        }
    })

    socket.on("createFile" , async({pathToFileOrFolder})=>{
        const isFileAlreadyExists = await fs.stat(pathToFileOrFolder);
        if(!isFileAlreadyExists){
            socket.emit("createFileError", {
                error: "File already exists"
            });
            return;
        }
        try{
            const response = await fs.writeFile(pathToFileOrFolder , "");
            socket.emit("createFileSuccess", {
                data: "File created successfully"
            });
        }
        catch (error) {
            console.error("Error creating file:", error);
            socket.emit("createFileError", {
                error: "Failed to create file"
            });
        }
    });


    socket.on("readFile" , async({pathToFileOrFolder})=>{
        try{
            const response = await fs.readFile(pathToFileOrFolder);
            console.log("response:", response.toString());
            socket.emit("readFileSuccess", {
                value: response.toString(),
                path: pathToFileOrFolder
            });
        }
          catch (error){
            console.error("Error reading file:", error);
            socket.emit("readFileError", {
                error: "Failed to read file"
            });
        }
    });

    socket.on("deleteFile" , async({pathToFileOrFolder})=>{
        try{
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess" , {
                data:"File Deleted Successfully"
            })
        }
        catch(error){
            console.log("error deleting file:", error);
            socket.emit("deleteFileError", {
                error:"Failed to delete file"
            });
        }
    })

    socket.on("createFolder" , async({pathToFileOrFolder})=>{
       
        try{
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit("createFolderSuccess", {
                data: "Folder created successfully"
            });
        }
        catch(error){
            console.log("error creating folder:" , error);
            socket.emit("createFolderError" , {
                error: "Failed to create folder"
            });
        }
    });

    socket.on("deleteFolder" , async({pathToFileOrFolder})=>{
        try{
            const response = await fs.rmdir(pathToFileOrFolder , {recursive:true});
            socket.emit("deleteFolderSucces" , {
                data: "Folder deleted successfully"
            })
        }
        catch(error){
            console.log("error deleting folder:", error);
            socket.emit("deleteFolderError", {
                error: "Failed to delete folder"
            });
        }
    })
}
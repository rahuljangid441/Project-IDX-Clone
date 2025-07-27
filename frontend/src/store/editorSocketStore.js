import { create } from "zustand";
import { useActiveTabFileStore } from './activeFileTabStore';
import { useTreeStructureStore } from "./treeStructureStore";
import { usePortSocketStore } from "./portSocketStore";
export const useEditorSocketStore = create((set) => {

    
  return {

  
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
          const activeFileTabSetter = useActiveTabFileStore.getState().setActiveFileTab;
          const projectTreeStructure = useTreeStructureStore.getState().setTreeStructure;
          const portSetter = usePortSocketStore.getState().setPort;
        
      incomingSocket?.on("readFileSuccess", (data) => {
        console.log("File read successfully", data.path);
       const extension = data.path.split(".").pop();
       console.log("File extension is: ", extension);
      //  console.log("File extension is: ", extension);
        activeFileTabSetter(data.path, data.value, extension);


      });


      incomingSocket?.on("writeFileSuccess", (data) => {
        console.log("File write successfully", data);
        incomingSocket.emit("readFile", {
          pathToFileOrFolder: data.path,
        });
      });

      incomingSocket?.on("deleteFileSuccess" , ()=>{
        projectTreeStructure();
      });

      incomingSocket?.on("getPortSuccess" , ({ port })=>{
        portSetter(port);
        console.log("Port received: ", port);
      })
      set({
        editorSocket: incomingSocket,
      });
    },
  };
});

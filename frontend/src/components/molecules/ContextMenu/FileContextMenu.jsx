import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenu";
import './FileContextMenu.css';
export const FileContextMenu = ({ x, y, path }) => {

    
    const { setIsOpen } = useFileContextMenuStore();
     const { editorSocket } = useEditorSocketStore();

    function handleDeleteFile(e){
        editorSocket.emit("deleteFile", {
            pathToFileOrFolder: path
        })
        e.preventDefault();
        console.log("Delete action triggered for path: ", path);
    }
  return (
    <div
    onMouseLeave={()=>{
        console.log("Mouse left the context menu");
        setIsOpen(false);
    }}
      style={{
        width: "150px",
        position: "fixed",
        top: y,
        left: x,
        border: "1.5px solid black",
      }}
    >
      <button className="fileContextButton" onClick={handleDeleteFile}>Delete File</button>
      <button className="fileContextButton">Rename File</button>
    </div>
  );
};

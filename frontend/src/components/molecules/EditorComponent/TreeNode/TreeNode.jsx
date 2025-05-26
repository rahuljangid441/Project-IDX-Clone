import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { FileIcon } from "../../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../../store/editorSocketStore";



export const TreeNode = ({
    fileFolderData
})=>{



    const [visiblity , setVisibility] = useState({});
    const{ editorSocket } = useEditorSocketStore()
    


    function toggleVisibilty(name){
        setVisibility({
            ...visiblity,
            [name]:!visiblity[name]
        })
    }

    function computeExtension(fileFolderData){
        const names = fileFolderData.name.split(".");
        console.log("Names are ", names);
        return names[names.length - 1];
    }


    function handleDoubleClick(fileFolderData){
        console.log("File or folder double clicked: ", fileFolderData);
        editorSocket.emit("readFile" , {
            pathToFileOrFolder : fileFolderData.path
        })
    }
    useEffect(()=>{
        console.log("Visibility is set to ", visiblity);
    },[visiblity])
    return(
   fileFolderData && (   <div
       style={{
            paddingLeft : "15px",
            color:"black"
        }}
        
        >

        {fileFolderData.children ? (
            <button 
            onClick={()=> toggleVisibilty(fileFolderData.name)}
            style={{
            border: "none",
              cursor: "pointer",
              outline: "none",
              color: "white",
              backgroundColor: "transparent",
              paddingTop: "15px",
              fontSize: "15px",
            }}>  {visiblity[fileFolderData.name]? <IoIosArrowDown/> : <IoIosArrowForward/>} 
            {fileFolderData.name}</button>
        ):(

<div style={{
    display: "flex",
    alignItems: "center",
}}>
            <FileIcon extension={computeExtension(fileFolderData)} />
            <p style={{
                paddingTop: "10px",
              fontSize: "15px",
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              marginLeft: "10px",
            }}
            onDoubleClick={()=> handleDoubleClick(fileFolderData)}
            
            >{fileFolderData.name}</p>
            </div>
        )}
        
        { visiblity[fileFolderData.name] &&fileFolderData.children && fileFolderData.children.map((child) => (
            <TreeNode fileFolderData={child} key={child.name} />
        )) }
       </div>
   )
    )
}
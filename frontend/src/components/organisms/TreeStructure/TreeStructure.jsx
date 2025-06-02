import { useParams } from "react-router-dom";
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";
import { TreeNode } from "../../molecules/EditorComponent/TreeNode/TreeNode";
import { useFileContextMenuStore } from "../../../store/fileContextMenu";
import { FileContextMenu } from "../../molecules/ContextMenu/FileContextMenu";

export const TreeStructure = () =>{

    const {treeStructure , setTreeStructure} = useTreeStructureStore();
    const { projectId } = useParams();
    const{file , isOpen:isFileContextOpen , x:fileContextX , y:fileContextY } = useFileContextMenuStore();


    useEffect(()=>{
        if(treeStructure){
            console.log("Tree structure is already set", treeStructure);
        }
        else{
            setTreeStructure(projectId);
        }
     
    },[projectId , setTreeStructure ,treeStructure])
    return (
        <>
        {isFileContextOpen && fileContextX && fileContextY && (
            <FileContextMenu x={fileContextX} y={fileContextY} path={file}/>
        )}
            <TreeNode fileFolderData ={treeStructure}/>
        </>
    )
}
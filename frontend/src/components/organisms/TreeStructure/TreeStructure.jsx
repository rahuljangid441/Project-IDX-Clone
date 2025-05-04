import { useParams } from "react-router-dom";
import { useTreeStructureStore } from "../../../store/treeStructureStore"
import { useEffect } from "react";
import { TreeNode } from "../../molecules/EditorComponent/TreeNode/TreeNode";

export const TreeStructure = () =>{

    const {treeStructure , setTreeStructure} = useTreeStructureStore();
    const { projectId } =useParams();


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
            <h1>TreeStructure</h1>
            <TreeNode fileFolderData ={treeStructure}/>
        </>
    )
}
import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
// import { useTreeStructureStore } from "../store/treeStructureStore";
// import { useEffect } from "react";

export const ProjectPlayground = () =>{



    const { projectId } = useParams();

    console.log("Project Id from URL is ", projectId);
    
    // const { setProjectId , projectId } = useTreeStructureStore();


    // useEffect(()=>{
    //     setProjectId(projectIdFromURL);
    //     console.log("Project Id is set to ",projectId);
    // },[])
    return(
        <>
            Project Id is {projectId}
            <div style={{
                backgroundColor:"#333254",
                paddingRight:"10px",
                paddingTop:"0.3vh",
                minWidth:"250px",
                maxWidth:"25%",
                height:"99.7vh",
                overflow:"auto"
            }}>
            <TreeStructure />
            </div>
            

            <EditorComponent />
            <EditorButton isActive={true}/>
            <EditorButton isActive={false}/>

           
        </>
    )
}
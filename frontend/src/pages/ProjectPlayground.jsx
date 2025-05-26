import { useParams } from "react-router-dom"
import { EditorComponent } from "../components/molecules/EditorComponent/EditorComponent";
import { EditorButton } from "../components/atoms/EditorButton/EditorButton";
import { TreeStructure } from "../components/organisms/TreeStructure/TreeStructure";
import { io } from 'socket.io-client';
import { useEditorSocketStore } from "../store/editorSocketStore";
// import { useTreeStructureStore } from "../store/treeStructureStore";
import { useEffect } from "react";

export const ProjectPlayground = () =>{



    const { projectId } = useParams();

    console.log("Project Id from URL is ", projectId);

    

    const{ setEditorSocket } = useEditorSocketStore();
    
    // const { setProjectId , projectId } = useTreeStructureStore();


    useEffect(()=>{
       const editorSocketConnection = io(`${import.meta.env.VITE_BACKEND_URL}/editor` , {
        query:{
            projectId:projectId
        }
       });

       setEditorSocket(editorSocketConnection);
    },[setEditorSocket , projectId])
    return(
        <>
            Project Id is {projectId}
            <div style={{
                display:"flex",
               
            }}>
            <div style={{
                backgroundColor:"#333254",
                paddingRight:"0.3vh",
                paddingTop:"0.3vh",
                minWidth:"250px",
                maxWidth:"25%",
                height:"99.7vh",
                overflow:"auto"
            }}>
            <TreeStructure />
            </div>
            

            <EditorComponent />
            </div>
            
            <EditorButton isActive={true}/>
            <EditorButton isActive={false}/>

           
        </>
    )
}
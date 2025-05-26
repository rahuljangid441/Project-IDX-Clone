import Editor from "@monaco-editor/react";
import { useEffect , useState } from "react";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useActiveTabFileStore } from "../../../store/activeFileTabStore";

export const EditorComponent = () => {

    const [editorState , setEditorState] = useState({
        theme:null
    });

    const { editorSocket } = useEditorSocketStore();
    const { activeFileTab , setActiveFileTab } = useActiveTabFileStore();

    async function downloadTheme(){
        const response = await fetch('/Dracula.json');
        const data = await response.json();
        setEditorState({...editorState , theme:data})
    }

    function handleEditorTheme(editor , monaco){
        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');
    }
    useEffect(()=>{
        downloadTheme();
    },[])

    editorSocket?.on("readFileSuccess" , (data)=>{
      console.log("File read successfully", data);
      setActiveFileTab(data.path , data.value)
   
     
    })
  return (
    <>
    { editorState.theme && (
    <Editor
        height="90vh"
        width="100%"
        defaultLanguage={undefined}
        defaultValue="// some comment"
        value={activeFileTab?.value || ""}
        options={{
            fontSize:18,
            fontFamily:'monospace'
        }}
    

        onMount={handleEditorTheme}

       
      />)}
      
      
    </>
  );
};

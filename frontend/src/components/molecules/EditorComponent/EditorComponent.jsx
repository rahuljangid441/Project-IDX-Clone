import Editor from "@monaco-editor/react";
import { useEffect , useState } from "react";

export const EditorComponent = () => {

    const [editorState , setEditorState] = useState({
        theme:null
    })

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
  return (
    <>
    { editorState.theme && (
    <Editor
        height="90vh"
        width="100%"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        options={{
            fontSize:18,
            fontFamily:'monospace'
        }}

        onMount={handleEditorTheme}
      />)}
      
      
    </>
  );
};

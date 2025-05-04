import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";


export const TreeNode = ({
    fileFolderData
})=>{



    const [visiblity , setVisibility] = useState({});


    function toggleVisibilty(name){
        setVisibility({
            ...visiblity,
            [name]:!visiblity[name]
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
              color: "black",
              backgroundColor: "transparent",
              paddingTop: "15px",
              fontSize: "15px",
            }}>  {visiblity[fileFolderData.name]? <IoIosArrowDown/> : <IoIosArrowForward/>} 
            {fileFolderData.name}</button>
        ):(
            <p style={{
                paddingTop: "10px",
              fontSize: "15px",
              color: "black",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              outline: "none",
              marginLeft: "10px",
            }}>{fileFolderData.name}</p>
        )}
        
        { visiblity[fileFolderData.name] &&fileFolderData.children && fileFolderData.children.map((child) => (
            <TreeNode fileFolderData={child} key={child.name} />
        )) }
       </div>
   )
    )
}
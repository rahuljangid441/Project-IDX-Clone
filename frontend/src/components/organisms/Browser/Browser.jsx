import { useEffect, useRef } from "react";
import { Input, Row } from "antd";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { usePortSocketStore } from "../../../store/portSocketStore";
import { ReloadOutlined } from "@ant-design/icons";

export const Browser = ({ projectId }) => {

    const browserRef = useRef(null);
    const { port } = usePortSocketStore();

    const { editorSocket } = useEditorSocketStore();

    useEffect(() => {
        if(!port) {
            editorSocket?.emit("getPort", {
                containerName: projectId
            })
        }
    }, [projectId ,port, editorSocket]);

    if(!port) {
        return <div>Loading....</div>
    }

    function handleRefresh() {
        if(browserRef.current) {
            const oldAddr = browserRef.current.src;
            browserRef.current.src = oldAddr;
        }
    }

    return (
        <Row
            style={{
                backgroundColor: "#22212b"
            }}
        >
            <Input 
                style={{
                    width: "100%",
                    height: "30px",
                    color: "white",
                    fontFamily: "Fira Code",
                    backgroundColor: "#282a35",
                }}
                prefix={<ReloadOutlined onClick={handleRefresh} />}
                defaultValue={`http://localhost:${port}`}
            />

            <iframe 
                ref={browserRef}
                src={`http://localhost:${port}`}
                style={{
                    width: "100%",
                    height: "95vh",
                    border: "none"
                }}
            />

        </Row>
    )

}
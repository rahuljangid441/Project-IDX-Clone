import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"
import { useEffect , useRef } from "react"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom";

export const BrowserTerminal = () => {

    const terminalRef = useRef(null);
    const socket = useRef(null);
    let { projectId } = useParams();

    useEffect(()=>{
        const terminal = new Terminal({
            cursorBlink: true,
            fontSize:14,
            fontFamily:"monospace",
            convertEol: true,
            theme: {
                background: "#282a37",
                foreground: "#d4d4d4",
                cursor: "#d4d4d4",
                selection: "#264f78",
                red: "#f14c4c",
                green: "#23d18b",
                cyan: "#29b8db",
                yellow: "#e5c07b",
            }
        });

        terminal.open(terminalRef.current);
        let fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        fitAddon.fit();

        socket.current = io(`${import.meta.env.VITE_BACKEND_URL}/terminal`, {
            query:{
                projectId: projectId
            }
        });

        socket.current.on("shell-output" , (data)=>{
            console.log("Data from server: ", data);
            terminal.write(data);
        });

        terminal.onData((data)=>{
            console.log("Data from terminal: ", data);
            //data we are typing in console by user
            socket.current.emit("shell-input", data);
        });

        return()=>{
            terminal.dispose();
            socket.current.disconnect();
        }


    },[])
    return(
        <div
        ref={terminalRef}
        style={{
            height: "25vh",
            overflow:"auto"
        }}
        className="terminal"
        id="terminal-container"
        >

        </div>
    )
}
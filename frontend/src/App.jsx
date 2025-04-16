import "./App.css";
import PingComponent from "./components/atoms/PingComponent";
import { useState } from "react";

function App() {

  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <>
      <button onClick={()=> setIsVisible(!isVisible)}>Click me!</button>
      {isVisible && <PingComponent />}
    </>
  )
}

export default App;

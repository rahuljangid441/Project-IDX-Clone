import { FaJs, FaCss3, FaHtml5 } from "react-icons/fa";
import { FaReact } from "react-icons/fa";

export const FileIcon = ({ extension }) => {
  console.log("Extension", extension);
  const IconMapper = {
    js: <FaJs color="yellow" style={{ height: "25px", width: "25px" }} />,
    jsx: <FaReact color="blue" style={{ height: "25px", width: "25px" }} />,
    css: <FaCss3 color="blue" style={{ height: "25px", width: "25px" }} />,
    html: <FaHtml5 color="red" style={{ height: "25px", width: "25px" }} />,
  };

  return <>{IconMapper[extension]}</>;
};

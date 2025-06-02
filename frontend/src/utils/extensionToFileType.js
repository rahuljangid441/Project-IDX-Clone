const fileExtensions={
  'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'json': 'json',
    'html': 'html',
    'css': 'css',
    'md': 'markdown'
}
export default function extensionToFileType(extension){
    // switch(extension){
    //     case "js":
    //     case "jsx":
    //         return "JavaScript";
    //     case "ts":
    //     case "tsx":
    //         return "TypeScript";
    //     case "py":
    //         return "Python";
    //     case "java":
    //         return "Java";
    //     case "c":
    //     case "cpp":
    //         return "C/C++";
    //     case "html":
    //         return "HTML";
    //     case "css":
    //         return "CSS";
    //     case "json":
    //         return "JSON";
    //     case "md":
    //         return "Markdown";
    //     default:
    //         return "Text File"; // Default for unknown extensions
    // }

    console.log("Extension received: ", extension);
    console.log("File extensions mapping: ", fileExtensions[extension]);
    return fileExtensions[extension] || "Text File"; // Default for unknown extensions
}
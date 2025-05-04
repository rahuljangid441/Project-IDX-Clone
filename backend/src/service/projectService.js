import fs from 'fs/promises';
import uuid4 from 'uuid4';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import { execPromisified } from '../utils/execUtility.js';
import path from 'path';
import directoryTree from 'directory-tree';

export const CreateProjectService = async(req , res)=>{
        try{
            
    
            const projectId = uuid4();
            console.log("New Project id is" , projectId);
            await fs.mkdir(`./projects/${projectId}`);
            console.log("New project folder with projectid" , projectId ,"is created");
    
            const response = await execPromisified(REACT_PROJECT_COMMAND , {
                cwd: `./projects/${projectId}`
            });
    
            

            return projectId;
        }
        catch(err){
            console.log("Error in creating Project");
            return res.status(500).json({
                message:"Error in creating project",
                success:false
            })
        }
}

export const getProjectTreeService = async(projectId) =>{
    const projectPath = path.resolve(`./projects/${projectId}`);
    const tree = directoryTree(projectPath);
    return tree;
}
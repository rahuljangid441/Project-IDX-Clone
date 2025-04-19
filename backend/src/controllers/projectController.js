import util from 'util'
import child_process from 'child_process';
import fs from 'fs/promises';
import uuid4 from 'uuid4';


const execPromisified = util.promisify(child_process.exec);
export const createProjectController = async(req , res)=>{
    try{
        

        const projectId = uuid4();
        console.log("New Project id is" , projectId);
        await fs.mkdir(`./projects/${projectId}`);
        console.log("New project folder with projectid" , projectId ,"is created");

        const response = await execPromisified('npm create vite@latest sandbox -- --template react' , {
            cwd: `./projects/${projectId}`
        });

        return res.status(201).json({
            message:"Project created successfully",
            success:true
        })
    }
    catch(err){
        console.log("Error in creating Project");
        return res.status(500).json({
            message:"Error in creating project",
            success:false
        })
    }
}
import axios from "../config/axiosConfig";

export const createProjectApi = async()=>{
    try{
        const response = await axios.post('/api/v1/projects');
        console.log("In creating Projects" , response.data)
        return response.data;
    }
    catch(err){
        console.log("error in creating project/calling api from frontend",err);
        throw err;
    }
}

export const getProjectTree = async(projectId) =>{
    try{
        const response = await axios.get(`/api/v1/projects/${projectId}/tree`);
        console.log("In getting Projects Tree" , response.data.data)
        return response?.data?.data;
    }
    catch(err){
        console.log("error in getting project tree/calling api from frontend",err);
        throw err;
    }
}
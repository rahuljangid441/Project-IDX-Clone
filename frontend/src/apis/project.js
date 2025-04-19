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
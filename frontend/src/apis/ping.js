import axios from '../config/axiosConfig.js';

export const pingApi = async ()=>{
    try{
        const response = await axios.get('/api/v1/ping');
        console.log("resp is",response.data);
        return response.data;
    }
    catch(err){
        console.log("Error in Fetching Api ping",err);
        throw err;
    }
}
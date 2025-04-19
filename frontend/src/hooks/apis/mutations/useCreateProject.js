import { createProjectApi } from '../../../apis/project'
import { useMutation } from '@tanstack/react-query'


export const useCreateProject = () =>{
    const {mutateAsync , isPending , isSuccess , error} = useMutation({
        mutationFn:createProjectApi,
        onSuccess:(data)=>{
            console.log("Projects created successfully" , data);
        },
        onError:()=>{
            console.log("Error creating project");
        }
    });

    return{
        createProjectMutation : mutateAsync,
        isPending,
        isSuccess,
        error
    }
}
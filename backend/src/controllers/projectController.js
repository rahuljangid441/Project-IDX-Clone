
import { CreateProjectService , getProjectTreeService } from "../service/projectService.js";

export const createProjectController = async (req, res) => {
  const projectId = await CreateProjectService();
  return res.status(201).json({
    data: projectId,
    message: "Project created successfully",
    success: true,
  });
};

export const getProjectTree = async(req , res)=>{
    const tree = await getProjectTreeService(req.params.projectId);
    console.log("Tree path is",tree);

    return res.status(200).json({
        data:tree,
        success:true,
        message:"Successfully fetched the tree"
    })
}

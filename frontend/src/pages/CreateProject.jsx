import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { Button, Col , Row , Flex } from "antd";
export const CreateProject = () => {

  const navigate = useNavigate();
  const { createProjectMutation } = useCreateProject();
  async function handleCreateProject() {
    console.log("Going to create project");
    try {
      const response = await createProjectMutation();
      console.log("Project created successfully");
      navigate(`/project/${response.data}`)
     
    } catch (Err) {
      console.error("Error creating project", Err);
    }
  }
  return (
    <Row>
        <Col span={24}>
        <Flex justify="center" align="center">
            <Button
            type="primary"
            onClick={handleCreateProject}
            >
            Create Playground
            </Button>
        </Flex>
        </Col>
    </Row>
  );
};

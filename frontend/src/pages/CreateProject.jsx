import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { Button, Col , Row , Flex } from "antd";
export const CreateProject = () => {
  const { createProjectMutation } = useCreateProject();
  async function handleCreateProject() {
    console.log("Going to create project");
    try {
      await createProjectMutation();
      console.log("Project created successfully");
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

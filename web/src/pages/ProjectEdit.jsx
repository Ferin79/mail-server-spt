import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { UpdateProjects } from "../data/API";
import { useMutation, useQueryClient } from "react-query";

const ProjectEdit = () => {
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState(state.item.name || "");
  const [desc, setDesc] = useState(state.item.description || "");
  const [sendGrid, setSendGrid] = useState(state.item.sendGrid || "");
  const [verifiedEmail, setVerifiedEmail] = useState(
    state.item.sendGridVerifiedEmail || ""
  );

  const updateMutation = useMutation(
    () => UpdateProjects(state.item.id, name, desc, sendGrid, verifiedEmail),
    {
      onSuccess: (response) => {
        const cacheData = queryClient.getQueryData("projects");
        const latestData = cacheData.data.projects.map((item) => {
          if (item.id === response.data.project.id) {
            item = response.data.project;
          }
          return item;
        });
        cacheData.data.projects = latestData;
        queryClient.setQueryData("projects", cacheData);

        setName("");
        setDesc("");
        history.push("/project");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.isAxiosError
            ? error.response.data.message
            : error.message,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      },
    }
  );

  if (!state?.item) {
    return <Redirect to="/project" />;
  }

  return (
    <Box width="100%">
      <Heading>Edit Project</Heading>
      <Flex width="100%" bg="white" p="5" my="5">
        <Box width="50%">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>

          <FormControl id="desc" mt="5">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
            />
          </FormControl>

          <FormControl id="sendGrid" mt="5">
            <FormLabel>SendGrid API Key</FormLabel>
            <Input
              type="text"
              value={sendGrid}
              onChange={(event) => setSendGrid(event.target.value)}
            />
          </FormControl>

          <FormControl id="sendGrid" mt="5">
            <FormLabel>SendGrid Verified Email</FormLabel>
            <Input
              type="email"
              value={verifiedEmail}
              onChange={(event) => setVerifiedEmail(event.target.value)}
            />
          </FormControl>

          <Flex mt="5">
            <Button
              colorScheme="blue"
              onClick={() => updateMutation.mutate()}
              isLoading={updateMutation.isLoading}
            >
              Update
            </Button>
            <Button mx="5" onClick={() => history.goBack()}>
              Cancel
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProjectEdit;

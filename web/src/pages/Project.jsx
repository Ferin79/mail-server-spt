import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateProjects, DeleteProjects, GetProjects } from "../data/API";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFundView,
} from "react-icons/ai";
import { useHistory } from "react-router-dom";

const Project = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const history = useHistory();

  const { data, isLoading } = useQuery("projects", GetProjects, {
    staleTime: 1000 * 60 * 1,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [sendGrid, setSendGrid] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [deleteData, setDeleteData] = useState(null);

  const createMutation = useMutation(
    () => CreateProjects(name, desc, sendGrid, verifiedEmail),
    {
      onSuccess: (response) => {
        queryClient.setQueryData("projects", (old) => {
          old.data.projects = [response.data.project].concat(old.data.projects);
          return old;
        });
        setIsOpen(false);
        setName("");
        setDesc("");
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

  const deleteMutation = useMutation(() => DeleteProjects(deleteData.id), {
    onSuccess: (response) => {
      if (response.data.data.affected > 0) {
        const cacheData = queryClient.getQueryData("projects");
        const latestData = cacheData.data.projects.filter(
          (item) => item.id !== response.data.id
        );
        cacheData.data.projects = latestData;
        queryClient.setQueryData("projects", cacheData);
        setDeleteData(null);
        setIsDeleteOpen(false);
      }
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
  });

  const handleSubmit = () => {
    if (!name.trim().length) {
      toast({
        title: "Error",
        description: "Project Name cannot be empty",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    if (!sendGrid.trim().length && verifiedEmail.trim().length) {
      toast({
        title: "Error",
        description: "SendGrid API Key cannot be empty",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    if (sendGrid.trim().length && !verifiedEmail.trim().length) {
      toast({
        title: "Error",
        description: "SendGrid Verified Email cannot be empty",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    createMutation.mutate();
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex flexDirection="column" width="100%">
      <Flex width="100%" justify="space-between" align="center">
        <Heading>Projects</Heading>
        <Button ml="auto" colorScheme="teal" onClick={() => setIsOpen(true)}>
          Create New Project
        </Button>
      </Flex>
      <Box overflowX="auto">
        {data?.data?.projects?.length ? (
          <Table variant="simple" mt="10" bg="white">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>API key</Th>
                <Th>sendGrid API Key</Th>
                <Th>sendGrid Verified Email</Th>
                <Th>Mail Sent</Th>
                <Th>Created At</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.data.projects.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.description}</Td>
                    <Td>{item.apiKey}</Td>
                    <Td>{item.sendGrid}</Td>
                    <Td>{item.sendGridVerifiedEmail}</Td>
                    <Td>{item.mailSent}</Td>
                    <Td>{new Date(item.createdAt).toLocaleString()}</Td>
                    <Td>
                      <Wrap>
                        <WrapItem>
                          <IconButton
                            onClick={() =>
                              history.push(`/project/mail/${item.id}`)
                            }
                            colorScheme="blue"
                            icon={<AiOutlineFundView size={25} />}
                          />
                        </WrapItem>
                        <WrapItem>
                          <IconButton
                            onClick={() =>
                              history.push("/project/edit", { item })
                            }
                            colorScheme="yellow"
                            icon={<AiOutlineEdit size={25} />}
                          />
                        </WrapItem>
                        <WrapItem>
                          <IconButton
                            onClick={() => {
                              setDeleteData(item);
                              setIsDeleteOpen(true);
                            }}
                            colorScheme="red"
                            icon={<AiOutlineDelete size={25} />}
                          />
                        </WrapItem>
                      </Wrap>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>API key</Th>
                <Th>sendGrid API Key</Th>
                <Th>sendGrid Verified Email</Th>
                <Th>Mail Sent</Th>
                <Th>Created At</Th>
                <Th>Actions</Th>
              </Tr>
            </Tfoot>
          </Table>
        ) : (
          <Flex height="100%" width="100%" justify="center" align="center">
            <Text fontSize="3xl">No Projects to show</Text>
          </Flex>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input
                required
                placeholder="My Awesome Project"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Describe your project...."
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>SendGrid API key</FormLabel>
              <Input
                placeholder="Optional"
                value={sendGrid}
                onChange={(event) => setSendGrid(event.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>SendGrid Verified Email</FormLabel>
              <Input
                type="email"
                placeholder="Optional"
                value={verifiedEmail}
                onChange={(event) => setVerifiedEmail(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isLoading={createMutation.isLoading}
            >
              Save
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project {deleteData?.name || ""}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => deleteMutation.mutate()}
                ml={3}
                isLoading={deleteMutation.isLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default Project;

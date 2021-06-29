import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { RegisterApi } from "../data/API";
import { Context } from "../data/Context";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const { setIsLoggedIn, setUser } = useContext(Context);

  const mutation = useMutation(() => RegisterApi(email, password), {
    onSuccess: (response) => {
      console.log(response.data);
      localStorage.setItem("userData", JSON.stringify(response.data));
      setIsLoggedIn(true);
      setUser(response.data.user);
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

  const handleOnRegister = () => {
    if (!email.trim().length) {
      toast({
        title: "Validation Error",
        description: "Email Cannot be Empty",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    if (!password.trim().length) {
      toast({
        title: "Validation Error",
        description: "Password Cannot be Empty",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    mutation.mutate();
  };
  return (
    <Flex width="100vw" height="100vh" justify="center" align="center">
      <Flex
        width={"container.md"}
        height="100vh"
        justify="center"
        align="flex-start"
        flexDirection="column"
        padding={["5", null]}
      >
        <Heading my="10">Register</Heading>

        <FormControl id="email" mt="5">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            placeholder="john.doe@example.com"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </FormControl>
        <FormControl id="password" mt="5">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>

        <Button
          mt="5"
          colorScheme="teal"
          onClick={handleOnRegister}
          isLoading={mutation.isLoading}
        >
          Register
        </Button>
        <Link to="/login">
          <Text mt="5">Login Here</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

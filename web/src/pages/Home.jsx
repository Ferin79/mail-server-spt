import React from "react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

const Home = ({ children }) => {
  return (
    <Flex width="100vw" minH="100vh" bg="gray.100">
      <Flex width="25%" minH="95%" bg="white" m="5" p="5" borderRadius="3xl">
        <Sidebar />
      </Flex>
      <Flex width="75%" minH="95%" m="5" p="5" borderRadius="3xl">
        {children}
      </Flex>
    </Flex>
  );
};

export default Home;

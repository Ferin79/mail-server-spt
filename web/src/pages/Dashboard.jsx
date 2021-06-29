import React from "react";
import {
  Flex,
  Heading,
  Wrap,
  WrapItem,
  Text,
  Box,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import { RiMailCheckLine, RiMailCloseLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { nFormatter } from "../utils/nFormatter";
import { DashboardInfo } from "../data/API";
import { RandomColor } from "../utils/RandomColor";

const Dashboard = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { data, isLoading } = useQuery("dashboard", () => DashboardInfo());

  const spin = keyframes`
  0% { 
    scale: 1; 
    opacity:0.75;
  }
  25%{
    scale:1.1;
    opacity:0.85;
  }
  50% {
    scale: 1.15;
    opacity:0.75;
  }
  75% {
    scale: 1.1;
    opacity:0.65;
  }
  100% { 
    scale: 1; 
    opacity:0.75;
  }
`;

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 5s linear`;

  if (isLoading) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    );
  }

  const cardData = [
    {
      name: "Total Projects",
      count: data.data["total project"] || 0,
      icon: <AiOutlineProject size={75} />,
      color: RandomColor(),
    },
    {
      name: "Total Mail Sent Successfully",
      count: data.data["mail sent successfully"] || 0,
      icon: <RiMailCheckLine size={75} />,
      color: RandomColor(),
    },
    {
      name: "Total Mail Sent Failed",
      count: data.data["mail failed"] || 0,
      icon: <RiMailCloseLine size={75} />,
      color: "red.500",
    },
  ];

  return (
    <Flex width="100%" flexDirection="column">
      <Heading m="3">Overview</Heading>
      <Wrap width="100%" spacing="20px" justify="space-evenly" align="center">
        {cardData.map((item, index) => {
          return (
            <WrapItem
              key={index}
              w="30%"
              h="200px"
              bg="white"
              borderRadius="2xl"
              padding="5"
            >
              <Flex
                width="100%"
                height="100%"
                justify="space-evenly"
                align="center"
              >
                <Flex
                  flexDirection="column"
                  width="50%"
                  height="100%"
                  justify="space-evenly"
                  align="flex-start"
                  mx="5"
                >
                  <Heading size="3xl">{nFormatter(item.count, 1)}</Heading>
                  <Text textTransform="capitalize">{item.name}</Text>
                </Flex>
                <Flex
                  width="50%"
                  justify="space-evenly"
                  align="center"
                  position="relative"
                >
                  <Box
                    width="150px"
                    height="150px"
                    borderRadius="50%"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    opacity="0.75"
                    bg={item.color}
                    style={{ filter: "blur(10px)" }}
                    animation={animation}
                  ></Box>
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%,-50%)"
                  >
                    {item.icon}
                  </Box>
                </Flex>
              </Flex>
            </WrapItem>
          );
        })}
      </Wrap>
    </Flex>
  );
};

export default Dashboard;

import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  AiOutlineDashboard,
  AiOutlineProject,
  AiOutlineFileText,
} from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useLocation, useHistory } from "react-router-dom";
import { Context } from "../data/Context";

const Sidebar = () => {
  const location = useLocation();
  const history = useHistory();
  const { setIsLoggedIn, setUser } = useContext(Context);

  const sidebarData = [
    {
      name: "dashboard",
      icon: <AiOutlineDashboard size={30} />,
      route: "/dashboard",
    },
    {
      name: "project",
      icon: <AiOutlineProject size={30} />,
      route: "/project",
    },
    {
      name: "Stats",
      icon: <AiOutlineFileText size={30} />,
      route: "/stats",
    },
  ];

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      justify="space-between"
      align="flex-start"
    >
      <Box height="15%" width="100%">
        <Text fontSize="3xl" color="teal" px="5" py="3">
          Mailer
        </Text>
        <Divider orientation="horizontal" width="100%" />
      </Box>

      <Flex width="100%" height="70%" align="flex-start" flexDirection="column">
        {sidebarData.map((item, index) => {
          return (
            <Flex
              key={index}
              width="100%"
              mt="50px"
              align="center"
              cursor="pointer"
              padding="5"
              _hover={{
                bg: "rgba(0,128,128,0.5)",
                borderRadius: "2xl",
                transition: "all 0.5s ease-in-out",
                color: "white",
              }}
              bg={
                location.pathname.includes(item.route)
                  ? "rgba(0,128,128,0.5)"
                  : null
              }
              borderRadius={
                location.pathname.includes(item.route) ? "2xl" : null
              }
              color={location.pathname.includes(item.route) ? "white" : null}
              onClick={() => history.push(item.route)}
            >
              {item.icon}
              <Text ml="25px" fontSize="lg" textTransform="capitalize">
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Flex>

      <Box height="15%" width="100%">
        <Divider orientation="horizontal" width="100%" />
        <Flex
          width="100%"
          align="center"
          cursor="pointer"
          padding="5"
          _hover={{
            bg: "rgba(255,0,0,0.5)",
            borderRadius: "2xl",
            transition: "all 0.5s ease-in-out",
            color: "white",
          }}
          onClick={() => {
            localStorage.clear();
            setIsLoggedIn(false);
            setUser(null);
          }}
        >
          <RiLogoutCircleLine size={30} />
          <Text ml="25px" fontSize="lg" textTransform="capitalize">
            Logout
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Sidebar;

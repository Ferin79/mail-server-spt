import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { MailsByProjectId } from "../data/API";
import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Mail = () => {
  const params = useParams();

  const { data, isLoading } = useQuery("mails", () =>
    MailsByProjectId(params.id)
  );
  if (!params.id) {
    return <Redirect to="/project" />;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  console.log(data);

  return (
    <Flex flexDirection="column" width="100%">
      <Heading>Mail Sent</Heading>
      <Box overflowX="auto" overflowY="scroll" maxH="50vh">
        {data.data.mails.length ? (
          <Table variant="simple" mt="10" bg="white">
            <Thead>
              <Tr>
                <Th>to</Th>
                <Th>subject</Th>
                <Th>file count</Th>
                <Th>Status</Th>
                <Th>Created At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.data.mails.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.to}</Td>
                    <Td>{item.subject}</Td>
                    <Td>{item.fileCount}</Td>
                    {item.isSuccess ? (
                      <Td color="green">Sent</Td>
                    ) : (
                      <Td color="red">Failed</Td>
                    )}
                    <Td>{new Date(item.createdAt).toLocaleString()}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>to</Th>
                <Th>subject</Th>
                <Th>file count</Th>
                <Th>Status</Th>
                <Th>Created At</Th>
              </Tr>
            </Tfoot>
          </Table>
        ) : (
          <Flex height="100%" width="100%" justify="center" align="center">
            <Text fontSize="3xl">No Mails to show</Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Mail;

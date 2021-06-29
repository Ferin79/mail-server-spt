import React from "react";
import { ChakraProvider, Theme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { ContextProvider } from "./data/Context";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={Theme}>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;

import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }) {
  const client = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;

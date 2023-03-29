import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Global
        styles={css`
          #__next {
            height: 100%;
          }
          html,
          body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

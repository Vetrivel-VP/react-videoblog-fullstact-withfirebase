import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "./theme";

ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Router>
      <App />
    </Router>
  </ChakraProvider>,

  document.getElementById("root")
);

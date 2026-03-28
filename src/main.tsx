import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./global.css";
import { appTheme } from "./theme";
import App from "./App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root not found");
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}
    >
      <MantineProvider defaultColorScheme="dark" theme={appTheme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);

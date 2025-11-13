import { createRoot } from "react-dom/client";
import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { I18nextProvider } from "react-i18next";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import i18n from "./i18n/i18n";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff9800",
    },
    background: {
      default: "#f7f9fb",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
);

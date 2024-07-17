import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, GlobalStyles, PaletteMode } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./domain/login/AuthProvider";
import SuperheroListPage from "./domain/superhero/pages/SuperheroListPage";
import SuperheroSinglePage from "./domain/superhero/pages/SuperheroSinglePage";
import SuperheroProvider from "./domain/superhero/SuperheroProvider";
import logo from "./logo.svg";
import Nav from "./navigation/Nav";
import NotFound from "./navigation/NotFound";

import { amber, grey, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginForm from "./domain/login/LoginForm";
import LogoffPage from "./domain/login/Logoff";
import SuperheroCreate from "./domain/superhero/SuperheroCreate";
import EditSuperhero from "./domain/superhero/SuperheroEditPage";
import { PageProvider } from "./domain/superhero/PageContext";
import SuperheroDeletePage from "./domain/superhero/pages/SuperheroDeletePage";
import ColorModeContext from "./navigation/ColorModeContext";
import { Private } from "./navigation/Private";
import ToggleColorMode from "./navigation/ToggleColorMode";

const customReactBlue = {
  main: "#00d8ff",
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          common: {
            white: amber[50],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
          background: {
            default: amber[600],
            paper: grey[200],
          },
        }
      : {
          // palette values for dark mode
          primary: customReactBlue,
          divider: teal[400],
          common: {
            white: grey[600],
          },
          background: {
            default: grey[800],
            paper: grey[800],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

const App: React.FC = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.common.white },
          h1: {
            color: theme.palette.text.primary,
          },
        }}
      />
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ToggleColorMode />
          </header>
          <main>
          <PageProvider>
            <AuthProvider>
                <SuperheroProvider>
                  <Nav />
                  <Container sx={{ marginTop: "80px" }}>
                    <Routes>
                      <Route path="/edit/:id" element={<Private><EditSuperhero /></Private>} />
                      <Route
                        path="/delete/:id"
                        element={<Private><SuperheroDeletePage /></Private>}
                      />
                      <Route path="/new" element={<Private><SuperheroCreate /></Private>} />
                      <Route
                        path="/superhero/:id"
                        element={<Private><SuperheroSinglePage /></Private>}
                      />
                      <Route path="/" element={<Navigate to="/login" />} />
                      <Route path="/login" element={<LoginForm />} />
                      <Route path="/logoff" element={<LogoffPage />} />
                      <Route path="/list" element={<Private><SuperheroListPage /></Private>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Container>
                </SuperheroProvider>
            </AuthProvider>
            </PageProvider>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

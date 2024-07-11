import { Container, PaletteMode } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SuperheroListPage from "./domain/superhero/SuperheroListPage";
import SuperheroProvider from "./domain/superhero/SuperheroProvider";
import SuperheroSinglePage from "./domain/superhero/SuperheroSinglePage";
import logo from "./logo.svg";
import Nav from "./navigation/Nav";
import NotFound from "./navigation/NotFound";
import Form from "./domain/superhero/Form";
import Delete from "./domain/superhero/Delete";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, deepOrange, grey } from "@mui/material/colors";
import ColorModeContext from "./navigation/ColorModeContext";
import ToggleColorMode from "./navigation/ToggleColorMode";



const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

const App: React.FC = () => {
  const [mode, setMode] = React.useState<PaletteMode>("dark");

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
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <ToggleColorMode />
          </header>
          <h1 color="primary">foo</h1>
          <main>
            <SuperheroProvider>
              <Nav />
              <Container sx={{ marginTop: "80px" }}>
                <Routes>
                  <Route path="/list" element={<SuperheroListPage />} />
                  <Route path="/edit/:id" element={<Form />} />
                  <Route path="/delete/:id" element={<Delete />} />
                  <Route path="/new" element={<Form />} />
                  <Route
                    path="/superhero/:id"
                    element={<SuperheroSinglePage />}
                  />
                  <Route path="/" element={<Navigate to="/list" />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Container>
            </SuperheroProvider>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

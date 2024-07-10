import { Container } from "@mui/material";
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

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <SuperheroProvider>
          <Nav />
          <Container sx={{ marginTop: "80px" }}>
            <Routes>
              <Route path="/list" element={<SuperheroListPage />} />
              <Route path="/edit/:id" element={<Form />} />
              <Route path="/delete/:id" element={<Delete />} />
              <Route path="/new" element={<Form />} />
              <Route path="/superhero/:id" element={<SuperheroSinglePage />} />
              <Route path="/" element={<Navigate to="/list" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </SuperheroProvider>
      </main>
    </div>
  );
};

export default App;

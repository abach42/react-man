import React from "react";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Ups ... Etwas ist schiefgelaufen</h1>
      <p>
        <Link to="/">Weiter zur Startseite</Link>
      </p>
    </Container>
  );
};

export default NotFound;

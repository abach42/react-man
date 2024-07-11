import React from "react";
import { Container, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";

const NotFound: React.FC = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Ups ... Etwas ist schiefgelaufen</h1>
      <p>
      <IconButton
          color="primary"
          aria-label="back"
          component={Link}
          to={`/`}
        >
          <ArrowBackIos />Weiter zur Startseite
        </IconButton>
      </p>
    </Container>
  );
};

export default NotFound;

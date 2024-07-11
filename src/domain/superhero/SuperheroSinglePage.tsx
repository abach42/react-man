import { ArrowBackIos } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import SuperheroLoader from "./SuperheroLoader";
import SuperheroSingle from "./SupherheroSingle";

const SuperheroSinglePage: React.FC = () => {
  const params = useParams<{ id: string | undefined }>();
  const id = params.id ? Number(params.id) : null;

  return (
    <>
      <h1>Superheld:in</h1>
      <SuperheroLoader id={id}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SuperheroSingle />
        </Box>
      </SuperheroLoader>

      <IconButton
          color="primary"
          aria-label="back"
          component={Link}
          to={`/`}
        >
          <ArrowBackIos />Weiter zur Startseite
        </IconButton>
    </>
  );
};

export default SuperheroSinglePage;
